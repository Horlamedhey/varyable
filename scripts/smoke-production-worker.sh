#!/usr/bin/env bash
set -euo pipefail

dir=$(mktemp -d)
trap 'rm -rf "$dir"' EXIT
apex=https://varyable.dev
www=https://www.varyable.dev
curl_args=(--silent --show-error --connect-timeout 5 --max-time 12)

smoke() {
  local redirect
  curl "${curl_args[@]}" --fail -D "$dir/html.headers" -o "$dir/html" "$apex/" &&
    grep -qi '^content-security-policy:' "$dir/html.headers" &&
    grep -q 'aria-pressed="true"[^>]*>Focused</button>' "$dir/html" &&
    redirect=$(curl "${curl_args[@]}" -o /dev/null -w '%{http_code} %{redirect_url}' "$www/") &&
    [[ "$redirect" == "308 $apex/" ]] &&
    curl "${curl_args[@]}" --fail -D "$dir/js.headers" -o "$dir/js" "$apex/view-mode-init.js" &&
    grep -Eqi '^content-type:[[:space:]]*(application|text)/javascript' "$dir/js.headers" &&
    curl "${curl_args[@]}" --fail -D "$dir/pdf.headers" -o "$dir/pdf" "$apex/resume.pdf" &&
    grep -qi '^content-type:[[:space:]]*application/pdf' "$dir/pdf.headers" &&
    [[ $(head -c 5 "$dir/pdf") == '%PDF-' ]]
}

for attempt in 1 2 3 4; do
  if smoke; then
    echo "Production HTTPS, SSR, www redirect, JavaScript, and PDF passed."
    exit 0
  fi
  echo "Worker smoke attempt $attempt failed."
  if (( attempt < 4 )); then sleep 8; fi
done

echo "Production Worker smoke tests did not pass." >&2
exit 1

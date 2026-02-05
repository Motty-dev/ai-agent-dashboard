#!/bin/bash
# Get real session data and parse it
output=$(clawdbot sessions list 2>/dev/null)
count=$(echo "$output" | grep "Sessions listed:" | grep -o '[0-9]*')
tokens_data=$(echo "$output" | grep -o '[0-9]*k/[0-9]*k' | head -1)
used=$(echo "$tokens_data" | cut -d'/' -f1 | sed 's/k//')
limit=$(echo "$tokens_data" | cut -d'/' -f2 | sed 's/k//')

# Convert k to actual numbers
used_num=$((${used:-15} * 1000))
limit_num=$((${limit:-40} * 1000))

echo "{"
echo "  \"count\": ${count:-1},"
echo "  \"contextUsed\": $used_num,"
echo "  \"contextLimit\": $limit_num,"
echo "  \"timestamp\": \"$(date -u +%Y-%m-%dT%H:%M:%SZ)\""
echo "}"
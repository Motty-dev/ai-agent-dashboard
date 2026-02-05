#!/bin/bash
echo "{"
echo "  \"model\": \"$(grep 'primary' ~/.clawdbot/clawdbot.json | cut -d'"' -f4)\","
echo "  \"contextLimit\": $(grep 'contextTokens' ~/.clawdbot/clawdbot.json | grep -o '[0-9]*'),"
echo "  \"memoryEnabled\": true"
echo "}"
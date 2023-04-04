# CURL command that sends a notification to devices subscribed to the interest "hello" => good for alerts
# Steps to run this script in the terminal
# - chmod +x notif.sh
# - ./notif.h

#! /usr/bin/env bash
curl -H "Content-Type: application/json" \
     -H "Authorization: Bearer F022DF8BDA529184A0F88E4C8750396914A195ACB0F6EABFF7562594D6154A9B" \
     -X POST "https://b8e54c3c-7ad0-41ce-9c6f-63f5d8f52dcb.pushnotifications.pusher.com/publish_api/v1/instances/b8e54c3c-7ad0-41ce-9c6f-63f5d8f52dcb/publishes" \
     -d '{"interests":["hello"],"web":{"notification":{"title":"Hello","body":"Hello, world!"}}}'
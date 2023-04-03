#! /usr/bin/env bash
curl -H "Content-Type: application/json" \
     -H "Authorization: Bearer F022DF8BDA529184A0F88E4C8750396914A195ACB0F6EABFF7562594D6154A9B" \
     -X POST "https://b8e54c3c-7ad0-41ce-9c6f-63f5d8f52dcb.pushnotifications.pusher.com/publish_api/v1/instances/b8e54c3c-7ad0-41ce-9c6f-63f5d8f52dcb/publishes" \
     -d '{"interests":["weather-alert"],"web":{"notification":{"title":"Weather Alert","body":"SNOW STORM!"}}}'
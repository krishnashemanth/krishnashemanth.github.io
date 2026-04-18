# 🖼️ Shared Assets (`/assets`)

## Overview
This folder acts as the centralized repository for global graphic assets utilized across various applications within the Personal Analyzer workspace. 

## Purpose & Protocol
Having a dedicated `assets/` root folder prevents binary file duplication across the multiple web application scopes existing inside the parent directory.

Because both the `/job-dashboard` UI and the `/portfolio` web pages require common branding elements (like avatars and unified logos), they share references to this folder.

## Contents
- **`favicon.png`**: The primary tab icon used for dashboard and portfolio identification.
- **`Logo.png`**: The full-resolution, foundational brand logo.
- **`Logo_transparent.png`**: An alpha-channel enabled variant used strategically over layered graphical components in UI modules.

**Rule:** Do not duplicate these files into `/Learning` or other nested public folders. Symlinks or relative paths (`../assets/`) must be utilized.

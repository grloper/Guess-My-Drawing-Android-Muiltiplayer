#!/usr/bin/env bash
# Single source of truth for 'is this change OK'. Exit code is the truth.
# Only checks that pass on main today are included (no linter/formatter is configured).
# NOT checked: the Xamarin.Android app itself (GuessMyDrawing/*.csproj needs the Android
# workload and is not built), Firebase/multiplayer behaviour, UI, or any device/emulator run.
# Only PictionaryWordGenerator.cs is compiled and exercised (checks/LogicChecks) plus the static site build.
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/.."

dotnet run --project checks/LogicChecks.csproj
npm run build
echo "verify: ALL CHECKS PASSED"

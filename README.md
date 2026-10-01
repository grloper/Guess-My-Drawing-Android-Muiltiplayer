# Guess My Drawing

A Xamarin.Android drawing-and-guessing prototype with a custom touch canvas and Firebase-backed room code. This is substantial historical application source, with networking and Android execution still unverified in this review.

## What the implementation contains

| Capability | Source evidence | Verification |
| --- | --- | --- |
| Touch strokes, brush color/width and canvas clearing | `GuessMyDrawing/PaintingClasses/FingerPaintCanvasView.cs` | Code inspected; device behavior untested |
| Word selection | `GuessMyDrawing/PaintingClasses/PictionaryWordGenerator.cs` | 10,000 concurrent draws tested |
| Room creation/join and gameplay | `GuessMyDrawing/LobbyActivity.cs`, `GameActivity.cs` | Code present; backend not contacted |
| Authentication screens | `GuessMyDrawing/MainActivity.cs`, `RegisterActivity.cs` | Code present; security not certified |

The word selector now returns three distinct words, including when duplicate entries appear in its word list, uses invariant uppercase, and serializes access to its shared random generator. The check compiles the production source directly.

## Safe local check

With .NET SDK 10 installed, run `dotnet run --project checks/LogicChecks.csproj`. This console check uses no Android device, Firebase endpoint, or account. It is a logic demonstration, not a multiplayer app demonstration.

## Android and backend status

The application targets legacy Xamarin.Android (`v12.0`). The attempted build on 2026-10-01 failed with MSB4019 because `Xamarin.Android.CSharp.targets` is absent. No APK, emulator session, live drawing synchronization, or latency measurement was produced.

Privileged database credentials were removed from source, and embedded FireSharp database endpoints were replaced with a deliberately invalid placeholder. Duplicate ZIP snapshots containing those credentials were removed. The current client cannot connect through those configurations. Prior Git history still contains sensitive material; the owner must revoke the exposed credentials separately. Do not restore privileged secrets to a mobile client. A maintained authenticated backend/emulator configuration and reviewed database rules are prerequisites for multiplayer testing.

Potential work remains: canvas uploads currently start for every touch event and draw a View from a background task; serialized/throttled UI-thread snapshots need Android validation. Room authorization and reconnect behavior have not been verified. Existing screenshot/video links were historical leads, not evidence of a current tested build.

## Positioning

Keep as a historical mobile game and canvas-learning project; prioritize a maintained Android migration before calling it a ready multiplayer product. Suggested repository name: `guess-my-drawing-android`. No license change or repository rename was made.

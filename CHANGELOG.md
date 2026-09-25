# Change Log

## 1.4.0

- Foundry v14 compatibility (v13 still supported).

## 1.3.0

- Foundry v13 compatibility. Support removed for Foundry v12 and older.
- Fix: Combat pause control failed on Foundry v12+ due to removed `combat.data`.
- Fix: Combat pause control now uses the current combatant directly, so it works even when the token is not on the viewed scene.
- Fix: Unpause on combat only triggers when combat starts, instead of undoing manual pauses during combat.
- Change: Only one active GM performs automated pause changes; the unsupported player-side pause workaround was removed.
- Change: Releases now published from GitHub.

## 1.2.0

- Refactor: Support removed for Foundry v10 and older.

## 1.1.0.3

- Fix: Unpause on ready did not work with v10 anymore [#1]

## 1.1.0.2

- Fix: Lingering v10 compatibility issue

## 1.1.0.1

- Fix: Release building

## 1.1.0

- Foundry v10 compatibility confirmation
- New release mechanism for smaller download & install sizes.

## 1.0.1

- Maintenance update.
- Bundling swapped from rollup to esbuild.

## 1.0.0.2

- Fixed: Settings reset did not work.

## 1.0.0 Dedicated Module

- Fixed: Restore pause state now remembers pre-combat state even if GM refreshes or server is restarted.

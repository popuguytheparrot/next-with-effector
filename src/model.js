import { createDomain, fork, sample } from "effector";

function timeString(lastUpdate) {
  const pad = (n) => (n < 10 ? `0${n}` : n);
  const format = (t) =>
    `${pad(t.getUTCHours())}:${pad(t.getUTCMinutes())}:${pad(
      t.getUTCSeconds()
    )}`;
  return format(new Date(lastUpdate));
}

function noop() {}

export const app = createDomain("rootDomain");

export const $lastUpdate = app.createStore(0);
export const $light = app.createStore(false);
const $timerId = app.createStore(null);

export const $timeString = $lastUpdate.map(timeString);

export const update = app.createEvent();
export const toggleLight = app.createEvent();
export const stopTimer = app.createEvent();

const fxStart = app.createEffect(() =>
  setInterval(() => {
    update(Date.now());
    toggleLight();
  }, 1000)
);

export const start = fxStart.prepend(noop);

$lastUpdate.on(update, (_, newState) => newState);
$timerId.on(fxStart.doneData, (_, timerId) => timerId);
$light.on(toggleLight, (state) => !state);

sample({
  source: $timerId,
  clock: stopTimer,
  fn: clearInterval,
});

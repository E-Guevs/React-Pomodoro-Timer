export default function formatTimer(time) {
  let min = Math.floor(time / 60),
    sec = time % 60;
  min = min < 10 ? `0${min}` : min;
  sec = sec < 10 ? `0${sec}` : sec;
  return `${min}:${sec}`;
}

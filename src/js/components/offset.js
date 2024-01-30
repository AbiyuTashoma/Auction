export function setOffset(obj, val) {
  return (obj["offset"] += val);
}

export function resetOffset(obj) {
  return (obj["offset"] = 100);
}

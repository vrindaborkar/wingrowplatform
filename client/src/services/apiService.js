export let baseUrl = "";

export function loadingShow(hidden) {
  let loading = document.getElementById("loading");
  loading.style.display = hidden;
}
export function loadingsShow(hidden) {
  let loading = document.getElementById("loadings");
  loading.style.display = hidden;
}

export const postLogin = (data) => {
  loadingShow("block");
  loadingShow("none");
};


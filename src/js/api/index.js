export const request = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      alert("응답 요청이 실패했습니다.");
      return;
    }
    const data = await response.json();
    return data;
  } catch (e) {
    alert("현재 응답이 원활하지 않습니다.");
    throw new Error(e);
  }
};

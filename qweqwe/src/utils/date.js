export function getDaysAgo(postedAt) {
    const postDate = new Date(postedAt);
    const today = new Date();
  
    // 밀리초 차이 → 일 단위로 변환
    const diffTime = today - postDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
    if (diffDays === 0) return "오늘";
    if (diffDays === 1) return "어제";
    return `${diffDays}일 전`;
  }
  
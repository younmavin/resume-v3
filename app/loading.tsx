// app/loading.tsx
export default function Loading() {
  return (
    <div className="loading-screen">
      <div className="loading-inner">
        <span className="ico">M</span>
        <div className="loading-bar">
          <span />
        </div>
        <p>페이지를 로딩 중 입니다.</p>
      </div>
    </div>
  )
}

// components/GitProject/index.tsx
import GitProjectCard from './GitProjectCard'
import GitProjectList from './GitProjectList'

const GitProject = async () => {
  const res = await fetch('https://api.github.com/users/younmavin/repos', {
    next: { revalidate: 3600 },
  })
  const repos = await res.json()
  // 마지막 업데이트 순으로 정렬
  const sorted = repos.sort((a: any, b: any) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime())

  return (
    <>
      <GitProjectCard />
      <GitProjectList repos={repos} />
    </>
  )
}

export default GitProject

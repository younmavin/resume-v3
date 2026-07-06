import GitProjectCardList from './GitProjectCardList'

const GitProjectCard = async () => {
  const res = await fetch('https://api.github.com/users/younmavin/repos', {
    next: { revalidate: 3600 },
  })
  const repos = await res.json()

  const oneMonthAgo = new Date()
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)

  const langs = ['HTML', 'CSS', 'JavaScript', 'Vue', 'TypeScript']
  const langCount: Record<string, { total: number; recentCount: number; date: string }> = {}
  langs.forEach((lang) => {
    langCount[lang] = { total: 0, recentCount: 0, date: '' }
  })

  repos.forEach((repo: any) => {
    const lang = repo.language
    if (!lang || !langCount[lang]) return
    langCount[lang].total += 1
    langCount[lang].date = repo.pushed_at?.slice(0, 10).replace(/-/g, '.') ?? ''
    const pushedAt = new Date(repo.pushed_at)
    if (pushedAt >= oneMonthAgo) {
      langCount[lang].recentCount += 1
    }
  })

  return <GitProjectCardList total={repos.length} langCount={langCount} />
}

export default GitProjectCard

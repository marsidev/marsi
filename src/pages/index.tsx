import type { InferGetServerSidePropsType, NextPage } from 'next'
import { serialize } from 'next-mdx-remote/serialize'
import { Layout } from '~/layouts/main'
import { loadFile } from '~/utils/fs'
import { Cover } from '~/views/Cover'
import { About } from '~/views/About'
import { Projects } from '~/views/Projects'
import { useActiveSection } from '~/hooks/use-active-section'

type AppProps = InferGetServerSidePropsType<typeof getStaticProps>

const App: NextPage<AppProps> = ({ aboutSource }) => {
	const { aboutRef, coverRef, projectsRef } = useActiveSection()

	return (
		<Layout>
			<Cover ref={coverRef} />
			<About ref={aboutRef} source={aboutSource} />
			<Projects ref={projectsRef} />
		</Layout>
	)
}

export const getStaticProps = async () => {
	const source = loadFile('src/content/about-me.mdx')
	const mdxSource = await serialize(source)

	return {
		props: {
			aboutSource: mdxSource
		}
	}
}

export default App

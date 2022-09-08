import { useInView } from 'react-intersection-observer'
import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { activeSectionAtom } from '~/store'
import { Section } from '~/types'

export const useActiveSection = () => {
	const [activeSection, setActiveSection] = useAtom(activeSectionAtom)

	const { ref: coverRef, inView: coverVisible } = useInView({
		threshold: 0,
		initialInView: true,
		fallbackInView: false
	})

	const { ref: aboutRef, inView: aboutVisible } = useInView({
		threshold: 0,
		rootMargin: '-300px',
		fallbackInView: false
	})

	const { ref: projectsRef, inView: projectsVisible } = useInView({
		threshold: 0,
		rootMargin: '-300px',
		fallbackInView: false
	})

	useEffect(() => {
		let active: Section = activeSection

		if (projectsVisible) {
			active = 'projects'
		} else if (aboutVisible) {
			active = 'about'
		} else if (coverVisible) {
			active = 'home'
		}

		if (active !== activeSection) {
			setActiveSection(active)
		}
	}, [aboutVisible, projectsVisible])

	return {
		coverRef,
		aboutRef,
		projectsRef
	}
}

export default useActiveSection

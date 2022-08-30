import {
	Flex,
	type FlexProps,
	Skeleton,
	useBreakpointValue,
	useColorModeValue
} from '@chakra-ui/react'
import { Atropos } from 'atropos/react'
import { type FC, useEffect, useRef, useState } from 'react'
import { Project } from '~/types'
import { CloudinaryImage } from '~/components/CloudinaryImage'
import { remToPx } from '~/utils/units'

interface ProjectProps extends FlexProps {
	project: Project
}

interface ImageDim {
	width: number
	height: number
}

const desktopAspectRatio = 861 / 1499
const mobileAspectRatio = 958 / 473

export const ProjectPreview: FC<ProjectProps> = ({ project: p, ...props }) => {
	const bg = useColorModeValue('gray.100', 'gray.700')
	const borderColor = useColorModeValue('gray.200', 'gray.600')
	const previewPadding = useBreakpointValue({ base: '1rem', sm: '1.6rem', md: '2rem' }, { fallback: 'base' })
	const [desktopLoaded, setDesktopLoaded] = useState(false)
	const [mobileLoaded, setMobileLoaded] = useState(false)
	const containerRef = useRef<HTMLDivElement>(null)
	const [mobileDims, setMobileDims] = useState<ImageDim | null>(null)
	const [desktopDims, setDesktopDims] = useState<ImageDim | null>(null)

	const loaded = desktopLoaded && mobileLoaded

	useEffect(() => {
		if (containerRef.current) {
			const containerWidth = containerRef.current.clientWidth

			const desktopPadding = 2 * remToPx(parseInt(previewPadding as string))
			const desktopWidth = Math.floor(containerWidth - desktopPadding)
			const desktopHeight = Math.floor(desktopWidth * desktopAspectRatio)

			const mobileWidth = Math.floor(containerWidth * 0.25)
			const mobileHeight = Math.floor(mobileWidth * mobileAspectRatio)

			setDesktopDims({
				width: desktopWidth,
				height: desktopHeight
			})

			setMobileDims({
				width: mobileWidth,
				height: mobileHeight
			})
		}
	}, [containerRef.current?.clientWidth, previewPadding])

	return (
		<Flex
			ref={containerRef}
			align='center'
			bg={bg}
			border='1px solid'
			borderColor={borderColor}
			borderRadius={{ base: 8, md: 16 }}
			justify='center'
			pos='relative'
			{...props}
		>
			<Skeleton
				borderRadius={{ base: 8, md: 16 }}
				fadeDuration={1}
				isLoaded={loaded}
			>
				<Atropos
					className='project-preview'
					rotateTouch='scroll-y'
					rotateXMax={24}
					rotateYMax={24}
					shadow={false}
				>
					<CloudinaryImage
						alt={`${p.name} desktop preview`}
						className='project-preview-desktop'
						data-atropos-offset='-4'
						height={desktopDims?.height}
						lazyLoadPlugin={true}
						placeholderPlugin={true}
						publicId={`marsidev${p.images!.desktop}`}
						style={{
							padding: previewPadding
						}}
						width={desktopDims?.width}
						onLoad={() => setDesktopLoaded(true)}
					/>

					<CloudinaryImage
						alt={`${p.name} mobile preview`}
						className='project-preview-mobile'
						data-atropos-offset='8'
						height={mobileDims?.height}
						lazyLoadPlugin={true}
						placeholderPlugin={true}
						publicId={`marsidev${p.images!.mobile}`}
						width={mobileDims?.width}
						onLoad={() => setMobileLoaded(true)}
					/>
				</Atropos>
			</Skeleton>
		</Flex>
	)
}

export default ProjectPreview

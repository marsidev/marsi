import { StackDivider, useColorModeValue } from '@chakra-ui/react'
import { MotionStack, MotionStackProps } from '~/components/motion'
import { useMount } from '~/hooks'
import { containerVariants, sideVariants } from '../variants'

interface MenuContainerProps extends MotionStackProps {
	children: React.ReactNode
}

export const MenuContainer: React.FC<MenuContainerProps> = ({
	children,
	...props
}) => {
	const dividerColor = useColorModeValue('gray.200', 'gray.700')
	const themedBg = useColorModeValue('white', 'gray.800')
	const mounted = useMount()

	return (
		<MotionStack
			key='mobile-menu'
			animate='animate'
			as='nav'
			bg={mounted ? themedBg : 'transparent'}
			direction='column'
			exit='exit'
			h='100vh'
			initial='initial'
			pos='fixed'
			variants={containerVariants}
			zIndex='overlay'
			{...props}
		>
			<MotionStack
				align='left'
				animate='open'
				as='ul'
				direction='column'
				divider={<StackDivider borderColor={dividerColor} />}
				initial='closed'
				justify='left'
				px={8}
				spacing={2}
				variants={sideVariants}
				w='100vw'
			>
				{children}
			</MotionStack>
		</MotionStack>
	)
}

export default MenuContainer
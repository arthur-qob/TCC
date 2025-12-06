import * as React from 'react'
import { Select as BaseSelect, selectClasses } from '@mui/base/Select'
import type {
	SelectListboxSlotProps,
	SelectProps,
	SelectRootSlotProps
} from '@mui/base/Select'
import { Option as BaseOption, optionClasses } from '@mui/base/Option'
import { styled } from '@mui/system'
import { CssTransition } from '@mui/base/Transitions'
import { PopupContext } from '@mui/base/Unstable_Popup'
import { ChevronsUpDown } from 'lucide-react'
import { useTheme } from '@/context/theme'

type CustomSelectProps = {
	defaultValue?: string
	options: Record<string, string>
	onChange?: (value: string) => void
	placeholder?: string
	className?: string
	id?: string
}

const CustomSelect = ({
	defaultValue = '',
	options = {},
	onChange,
	placeholder = 'Selecione uma opção',
	className = '',
	id = ''
}: CustomSelectProps) => {
	const { actualTheme } = useTheme()

	return (
		<Select
			defaultValue={defaultValue}
			onChange={(_, value) => onChange?.(value as string)}
			slotProps={{
				root: { actualTheme } as any,
				listbox: { actualTheme } as any
			}}
			className={className}
			id={id}>
			{!defaultValue && (
				<Option
					value=''
					disabled
					actualTheme={actualTheme}>
					{placeholder}
				</Option>
			)}
			{Object.entries(options).map(([label, value]) => (
				<Option
					value={value}
					key={value}
					actualTheme={actualTheme}>
					{label}
				</Option>
			))}
		</Select>
	)
}

export default CustomSelect

const Select = React.forwardRef(function CustomSelect<
	TValue extends {},
	Multiple extends boolean
>(
	props: SelectProps<TValue, Multiple>,
	ref: React.ForwardedRef<HTMLButtonElement>
) {
	const slots = {
		root: StyledButton,
		listbox: AnimatedListbox,
		popup: Popup,
		...props.slots
	}

	return (
		<BaseSelect
			{...props}
			ref={ref}
			slots={slots}
		/>
	)
})

const red = {
	100: '#fee2e2',
	200: '#fecaca',
	400: '#f87171',
	500: '#ef4444',
	600: '#dc2626',
	700: '#b91c1c',
	900: '#7f1d1d'
}

const grey = {
	50: '#fafafa',
	100: '#f4f4f5',
	200: '#e4e4e7',
	300: '#d4d4d8',
	400: '#a1a1aa',
	500: '#71717a',
	600: '#52525b',
	700: '#3f3f46',
	800: '#27272a',
	900: '#18181b'
}

const Button = React.forwardRef(function Button<
	TValue extends {},
	Multiple extends boolean
>(
	props: SelectRootSlotProps<TValue, Multiple>,
	ref: React.ForwardedRef<HTMLButtonElement>
) {
	const { ownerState, ...other } = props
	return (
		<button
			type='button'
			{...other}
			ref={ref}>
			{other.children}
			<ChevronsUpDown />
		</button>
	)
})

const StyledButton = styled(Button, {
	shouldForwardProp: (prop) => prop !== 'actualTheme'
})<{ actualTheme?: 'light' | 'dark' }>(
	({ actualTheme = 'light' }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  min-width: 320px;
  padding: 8px 12px;
  border-radius: 8px;
  text-align: left;
  line-height: 1.5;
  background: ${actualTheme === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${actualTheme === 'dark' ? grey[700] : grey[200]};
  color: ${actualTheme === 'dark' ? grey[300] : grey[900]};
  position: relative;
  box-shadow: 0 2px 4px ${
		actualTheme === 'dark' ? 'rgba(0,0,0, 0.5)' : 'rgba(0,0,0, 0.05)'
  };
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &.${selectClasses.focusVisible} {
    outline: 0;
    border-color: ${red[400]};
    box-shadow: 0 0 0 3px ${actualTheme === 'dark' ? red[700] : red[200]};
  }

  & > svg {
    font-size: 1rem;
    position: absolute;
    height: 100%;
    top: 0;
    right: 10px;
  }
  `
)

const Listbox = styled('ul', {
	shouldForwardProp: (prop) => prop !== 'actualTheme'
})<{ actualTheme?: 'light' | 'dark' }>(
	({ actualTheme = 'light' }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0;
  min-width: 320px;
  border-radius: 12px;
  overflow: auto;
  outline: 0;
  background: ${actualTheme === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${actualTheme === 'dark' ? grey[700] : grey[200]};
  color: ${actualTheme === 'dark' ? grey[300] : grey[900]};
  box-shadow: 0 2px 4px ${
		actualTheme === 'dark' ? 'rgba(0,0,0, 0.5)' : 'rgba(0,0,0, 0.05)'
  };

  .closed & {
    opacity: 0;
    transform: scale(0.95, 0.8);
    transition: opacity 200ms ease-in, transform 200ms ease-in;
  }

  .open & {
    opacity: 1;
    transform: scale(1, 1);
    transition: opacity 100ms ease-out, transform 100ms cubic-bezier(0.43, 0.29, 0.37, 1.48);
  }

  .placement-top & {
    transform-origin: bottom;
  }

  .placement-bottom & {
    transform-origin: top;
  }
  `
)

const AnimatedListbox = React.forwardRef(function AnimatedListbox<
	Value extends {},
	Multiple extends boolean
>(
	props: SelectListboxSlotProps<Value, Multiple>,
	ref: React.ForwardedRef<HTMLUListElement>
) {
	const { ownerState, ...other } = props
	const popupContext = React.useContext(PopupContext)

	if (popupContext == null) {
		throw new Error(
			'The `AnimatedListbox` component cannot be rendered outside a `Popup` component'
		)
	}

	const verticalPlacement = popupContext.placement.split('-')[0]

	return (
		<CssTransition
			className={`placement-${verticalPlacement}`}
			enterClassName='open'
			exitClassName='closed'>
			<Listbox
				{...other}
				ref={ref}
			/>
		</CssTransition>
	)
})

const Option = styled(BaseOption, {
	shouldForwardProp: (prop) => prop !== 'actualTheme'
})<{ actualTheme?: 'light' | 'dark' }>(
	({ actualTheme = 'light' }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: default;

  &:last-of-type {
    border-bottom: none;
  }

  &.${optionClasses.selected} {
    background-color: ${actualTheme === 'dark' ? red[900] : red[100]};
    color: ${actualTheme === 'dark' ? red[100] : red[900]};
  }

  &.${optionClasses.highlighted} {
    background-color: ${actualTheme === 'dark' ? red[900] : red[100]};
    color: ${actualTheme === 'dark' ? red[100] : red[900]};
  }

  &:focus-visible {
    outline: 3px solid ${actualTheme === 'dark' ? red[600] : red[200]};
  }

  &.${optionClasses.highlighted}.${optionClasses.selected} {
    background-color: ${actualTheme === 'dark' ? red[900] : red[100]};
    color: ${actualTheme === 'dark' ? red[100] : red[900]};
  }

  &.${optionClasses.disabled} {
    color: ${actualTheme === 'dark' ? grey[700] : grey[400]};
  }

  &:hover:not(.${optionClasses.disabled}) {
    background-color: ${actualTheme === 'dark' ? red[900] : red[100]};
    color: ${actualTheme === 'dark' ? red[100] : red[900]};
  }
  `
)

const Popup = styled('div')`
	z-index: 1;
`

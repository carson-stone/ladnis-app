const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	mode: 'jit',
	purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				green: {
					DEFAULT: '#4FEA83',
				},
				blue: {
					DEFAULT: '#445FDC',
				},
				purple: {
					light: '#FEFCFF',
					DEFAULT: '#223078',
				},
				gray: {
					light: '#FAFAFA',
					DEFAULT: '#DCDBE3',
				},
			},
			borderRadius: {
				md: '8px',
				lg: '10px',
			},
			fontFamily: {
				sans: ['Nunito Sans', ...defaultTheme.fontFamily.sans],
			},
			fontSize: {
				lg: '1.25rem',
				xl: '1.5rem',
				'2xl': '1.7rem',
			},
			boxShadow: {
				md: '0px 6px 18px rgba(0, 0, 0, 0.1);',
			},
			padding: {
				7.5: '30px',
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};

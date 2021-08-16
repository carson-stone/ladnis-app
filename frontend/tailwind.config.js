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
					med: '#DCDBE3',
				},
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};

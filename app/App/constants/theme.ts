import { extendTheme, themeTools } from 'native-base';

export default extendTheme({
  components: {
    ScrollView: {
      baseStyle: (props: any) => ({
        bg: themeTools.mode('light.50', 'dark.50')(props),
      }),
    },
    Stack: {
      baseStyle: (props: any) => ({
        bg: themeTools.mode('light.100', 'dark.100')(props),
      }),
    },
    Spinner: {
      baseStyle: () => ({
        color: 'indigo.600',
      }),
    },
  },
});

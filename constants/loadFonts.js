import {
  useFonts,
  MuseoModerno_600SemiBold,
  MuseoModerno_700Bold,
} from '@expo-google-fonts/museomoderno';

import {
Quicksand_300Light,
Quicksand_400Regular,
Quicksand_500Medium,
Quicksand_600SemiBold,
Quicksand_700Bold,
} from '@expo-google-fonts/quicksand';

import {
Baloo2_400Regular,
Baloo2_500Medium,
Baloo2_600SemiBold,
Baloo2_700Bold,
Baloo2_800ExtraBold,
} from '@expo-google-fonts/baloo-2';

export default function useCustomFonts() {
  return useFonts({
    MuseoModerno_600SemiBold,
    MuseoModerno_700Bold,
    Quicksand_300Light,
    Quicksand_400Regular,
    Quicksand_500Medium,
    Quicksand_600SemiBold,
    Quicksand_700Bold,
    Baloo2_400Regular,
    Baloo2_500Medium,
    Baloo2_600SemiBold,
    Baloo2_700Bold,
    Baloo2_800ExtraBold,
  });
}
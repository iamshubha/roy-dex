import { Platform } from 'react-native';

import { getTokenValue } from '@onekeyhq/components/src/shared/tamagui';
import { getGlassStyles, getGlassHoverStyles, getGlassFocusStyles } from '../../utils/liquidGlassStyles';

import type { IInputProps } from '.';

type ISharedStylesProps = Pick<
  IInputProps,
  'disabled' | 'editable' | 'error' | 'size'
>;

export function getSharedInputStyles({
  disabled,
  editable,
  error,
  size,
}: ISharedStylesProps) {
  const getBorderColor = () => {
    if (disabled) return '$borderDisabled';
    if (editable === false) return '$border';
    if (error) return '$borderCritical';
    return '$borderStrong';
  };

  const getBackgroundColor = () => {
    if (disabled || editable === false) return '$bgDisabled';
    return '$transparent';
  };

  const SIZE_MAPPINGS = {
    'large': {
      verticalPadding: '$2.5',
      horizontalPadding: '$3.5',
    },
    'medium': {
      verticalPadding: '$1.5',
      horizontalPadding: '$3',
    },
    'small': {
      verticalPadding: '$1',
      horizontalPadding: '$2',
    },
  };

  const { verticalPadding, horizontalPadding } =
    SIZE_MAPPINGS[size || 'medium'];

  // Apply premium liquid glass effect on web
  const isWebGlassEnabled = Platform.OS === 'web' && !disabled && editable !== false;
  const glassStyles = isWebGlassEnabled ? getGlassStyles({ blur: 'md', opacity: 0.12 }) : {};
  const glassHoverStyles = isWebGlassEnabled ? getGlassHoverStyles({ enableGlow: false }) : {};
  const glassFocusGlow = error ? '$glowCriticalStrong' : '$glowPrimaryStrong';

  return {
    borderRadius:
      size === 'large'
        ? getTokenValue('$3', 'size')
        : getTokenValue('$2', 'size'),
    borderColor: getBorderColor(),
    backgroundColor: getBackgroundColor(),
    px: horizontalPadding,
    py: verticalPadding,
    color: disabled ? '$textDisabled' : '$text',
    placeholderTextColor: '$textPlaceholder',
    borderWidth: '$px',
    cursor: disabled ? 'not-allowed' : 'text',
    ...glassStyles,
    hoverStyle: glassHoverStyles,
    focusVisibleStyle: disabled
      ? {}
      : {
        outlineWidth: 2,
        outlineStyle: 'solid',
        outlineColor: error ? '$focusRingCritical' : '$focusRing',
        ...(isWebGlassEnabled ? getGlassFocusStyles(glassFocusGlow) : {}),
      },
  };
}

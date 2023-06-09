import React from 'react';
import { SvgIcon as MuiSvgIcon, styled } from '@material-ui/core';

/**
 * create custom ColorIcon
*/

const SvgIcon = styled(MuiSvgIcon, {
  name: 'ColorIcon',
  shouldForwardProp: (prop) => prop == 'fill',
})(() => ({
  fill: 'currentColor',
}));

SvgIcon.defaultProps = {
  viewBox: '0 0 24 24',
  focusable: 'false',
  'aria-hidden': 'true',
}

const ColorIcon = (props) => {
  return (
    <SvgIcon {...props}>
      <path d="m 17.999999,18 c 0,3.313709 -2.686291,6 -6,6 -3.3137084,0 -5.9999998,-2.686292 -5.9999995,-6 -3e-7,-3.313708 5.9999995,-18 5.9999995,-18 0,0 6,14.686291 6,18 z" />
      {/*<path d="M 14.062469,8.9212496e-7 C 12.876965,8.5049999 19.226264,13.074257 18.093391,19.013963 17.096785,24.239219 10.496098,26.151462 7.0240744,20.840054 3.2218825,15.023567 11.009291,5.2083859 14.062469,8.9212496e-7 Z" />*/}
      {/*<path d="m 21.599998,14.4 c 0,5.301933 -4.298066,9.599999 -9.599999,9.599999 C 6.6980659,23.999999 2.3999999,19.701933 2.3999998,14.4 2.3999997,9.0980668 11.999999,0 11.999999,0 c 0,0 9.599999,9.0980668 9.599999,14.4 z" />*/}
      {/*<path d="M 23.999998,12 A 11.999999,11.999999 0 0 1 11.999999,23.999999 11.999999,11.999999 0 0 1 0,12 11.999999,11.999999 0 0 1 11.999999,9.5367432e-7 11.999999,11.999999 0 0 1 23.999998,12 Z"/>*/}
    </SvgIcon>
  )
}

export default ColorIcon;

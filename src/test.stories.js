import React from 'react';
import { withKnobs, text } from '@storybook/addon-knobs';
import a11yWrapper from './index';

export default {
  title: 'thing',
  decorators: [withKnobs],
};

export const thing = () => {
  return (
    <a11yWrapper id="a11y-button">
      {text(
        'This is some test content',
        'Optio odit quis aspernatur iure. Vel et enim error consequatur est est. Enim rem sapiente id doloribus velit id beatae quo. Beatae velit magni quibusdam temporibus possimus harum et id. '
      )}
    </a11yWrapper>
  );
};

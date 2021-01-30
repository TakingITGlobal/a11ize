import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import A11yWrapper from '../index';

export default {
  title: 'a11ize',
  decorators: [withKnobs],
};

export const a11yWrapper = () => {
  return (
    <A11yWrapper sticky={boolean('sticky', false)}>
      <h1>{text('Heading 1', 'This is Heading 1')}</h1>
      <h2>{text('Heading 2', 'This is Heading 2')}</h2>
      <h3>{text('Heading 3', 'This is Heading 3')}</h3>
      <h4>{text('Heading 4', 'This is Heading 4')}</h4>
      <h5>{text('Heading 5', 'This is Heading 5')}</h5>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '400px',
          height: '150px',
          justifyContent: 'space-around',
        }}
      >
        <input type="text" placeholder="test input field" />
        <input type="date" />
        <input type="email" placeholder="email here" />
        <a href="https://takingitglobal.org" target="_blank" rel="noreferrer">
          Link
        </a>
      </div>
      <p>
        {text(
          'Paragraph 1',
          'Enim aut nobis molestias quia qui adipisci consectetur quia. Ea ad excepturi quos inventore temporibus aliquam. Dolor nulla et mollitia. Quos eum iste ipsam dignissimos necessitatibus. Aliquid voluptas minima ea natus.'
        )}
      </p>
      <p>
        {text(
          'Paragraph 2',
          'Ipsum consequuntur doloribus veritatis cupiditate minus recusandae perferendis. Sed est fuga vero facere. Non exercitationem nihil rem alias aperiam aspernatur.'
        )}
      </p>
      <p>
        {text(
          'Paragraph 3',
          'Qui sint odio et voluptate quia porro. Sed inventore corporis sed culpa illo velit ut. Nam rerum rem qui. Qui non impedit non non assumenda. Qui autem omnis sequi. Rerum aperiam tempore sed.'
        )}
      </p>
      <p>
        {text(
          'Paragraph 4',
          'Voluptatem commodi id in in ut illo. Qui perspiciatis dolorem eum sunt voluptas aut. Voluptatibus harum error omnis tempore corporis.'
        )}
      </p>
      <p>
        {text(
          'Paragraph 5',
          'Ipsum commodi voluptas ea est rerum facere ut. Velit voluptatem quam nemo non voluptatem eveniet quas vel. Dolorem fugit in nostrum illo qui.'
        )}
      </p>
    </A11yWrapper>
  );
};

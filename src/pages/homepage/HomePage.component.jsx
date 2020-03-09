import React from 'react';

import { HomepageContainer } from './homepage.styled'
import './homepage.styles.scss'
import Directory from '../../components/directory/directory.component'

export const HomePage = () => (
    <HomepageContainer>
        <Directory />
    </HomepageContainer>
)


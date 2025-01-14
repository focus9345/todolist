import React from 'react';
import { render } from '@testing-library/react';
import PageWrapper from './wrapper';
import '@testing-library/jest-dom/extend-expect';
import { describe, it, expect } from '@jest/globals';

describe('PageWrapper', () => {
    it('should render children correctly', () => {
        const { getByText } = render(
            <PageWrapper>
                <div>Test Child</div>
            </PageWrapper>
        );
        expect(getByText('Test Child')).toBeInTheDocument();
    });

    it('should have the correct class names for main element', () => {
        const { container } = render(
            <PageWrapper>
                <div>Test Child</div>
            </PageWrapper>
        );
        const mainElement = container.querySelector('main');
        expect(mainElement).toHaveClass('flex flex-col content-start gap-4 px-10 py-12 items-center justify-between');
    });

    it('should have the correct class names for div element', () => {
        const { container } = render(
            <PageWrapper>
                <div>Test Child</div>
            </PageWrapper>
        );
        const divElement = container.querySelector('div');
        expect(divElement).toHaveClass('w-full justify-start max-w-[1024px]');
    });
});
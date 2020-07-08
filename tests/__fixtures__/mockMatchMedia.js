import cssMediaQuery from 'css-mediaquery';

class MockMatchMedia {
    constructor(query) {
        this.query = query;
        this._listeners = [];
        this.matches = this.isMatch();

        this._addListenerHandle = this._addListenerHandle.bind(this);

        this.addListener = jest.fn(this._addListenerHandle);
        this.removeListener = jest.fn();

        return this;
    }

    isMatch() {
        const query = this.query;
        // Workaround to have the correct orientation
        if (query.includes('orientation')) {
            if (query.includes('portrait')) {
                return window.innerHeight > window.innerWidth;
            }

            return window.innerWidth > window.innerHeight;
        }

        return cssMediaQuery.match(query, {
            width: window.innerWidth,
            height: window.innerHeight,
        });
    }

    _addListenerHandle(listener) {
        const resizeListener = () => {
            listener({
                matches: this.isMatch(),
            });
        };

        window.addEventListener('resize', resizeListener);
        this._listeners.push(resizeListener);
    }

    _removeAllResizeListeners() {
        this._listeners.forEach((listener) => {
            window.removeEventListener('resize', listener);
        });
    }
}

export const mockMatchMedia = () => {
    window._mockMatchMedia = [];

    window.matchMedia = (query) => {
        const mockMatchMedia = new MockMatchMedia(query);
        window._mockMatchMedia.push(mockMatchMedia);

        return mockMatchMedia;
    };

    window.resizeTo = function resizeTo(width, height) {
        Object.assign(this, {
            innerWidth: width,
            innerHeight: height,
            outerWidth: width,
            outerHeight: height,
        });

        window.dispatchEvent(new window.Event('resize'));
    };
};

export const unmockMatchMedia = () => {
    window._mockMatchMedia.forEach((mockMatchMedia) => {
        mockMatchMedia._removeAllResizeListeners();
    });

    window._mockMatchMedia = undefined;
    window.matchMedia = undefined;
    window.resizeTo = undefined;
};

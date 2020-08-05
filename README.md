# react-context-responsive

A package that provides a responsive context to your application, using React Context API.

It has the same API of [`redux-responsive`](https://github.com/AlecAivazis/redux-responsive) and they are easily interchangeable.

## Installation

```bash
$ yarn add @farfetch/react-context-responsive
$ npm i @farfetch/react-context-responsive
```

...and include it in your project

```js
import { ResponsiveProvider, useResponsive } from '@farfetch/react-context-responsive';
```

## Guidelines

### Provider use

The app, ideally, should have only one `<ResponsiveProvider>`, usually at `app.js`, wrapping all the components.

You can have as much consumers (`useResponsive`, `useIsMobile`, `Responsive`, `withResponsive` and `withIsMobile`) as you need. When the Provider value changes, all the consumers will update.

### Preferred consumers

The hooks (`useResponsive` and `useIsMobile`) are the preferred method of using the context, when possible. 

### Mobile device detection

When possible, use the `withIsMobile` and `useIsMobile` for mobile devices detection. In the future we might use it to automatically splitting of mobile-only code.

## ResponsiveProvider Props
| Prop               | Type    | Description                                                                   |
| ------------------ | ------- | ----------------------------------------------------------------------------- |
| initialMediaType   | string  | Used to mock a breakpoint in the initial state calculation. Defaults to 'xs'. |
| defaultOrientation | string  | Used to mock orientation in initial state calculation. Defaults to null.      |

## Object returned by the consumers:

| Key                    | Type    | Description                                                                                                                      |
|------------------------|---------|----------------------------------------------------------------------------------------------------------------------------------|
| isCalculated           | Boolean | False on first render. Once true, it means all breakpoints values are based on the window.                                       |
| mediaType              | String  | The current media type (breakpoint) name (ex: `'md'`).                                                                           |
| lessThan               | Object  | Object containing if current window width is less than a breakpoint (usage: `lessThan.lg`).                                      |
| greaterThan            | Object  | Object containing if current window width is greater than a breakpoint (usage: `greaterThan.lg`).                                |
| is                     | Object  | Object containing if current window width is the at a breakpoint (usage: `is.lg`).                                               |
| orientation            | String  | Current browser orientation (portrait, landscape or defined defaultOrientation at ResponsiveProvider, when others not available) |

## Usage and examples

To use the package, you must embrace your code with the `ResponsiveProvider`, following the guidelines.

The component has five different exported consumption APIs:

- `useResponsive`: A hook which returns the responsive object
- `useIsMobile`: A hook which returns an object with `isMobile` and `isCalculated`
- `Responsive`: A render prop component
- `withResponsive`: A HoC which passes the responsive data to the `responsive` prop
- `withIsMobile`: A HoC which passes `isMobile` and `isCalculated` props only

### Rendering components with `useResponsive` hook. (Preferred method)

```js
const Greetings = () => {
    const { lessThan } = useResponsive();
    
    if (lessThan.sm) {
        return (<p>Hello small screen!</p>);
    }
    
    return (<p>Hello medium/big screen!</p>);
};

export default Greetings;
```

### Rendering components with `useIsMobile` hook. (Preferred method)

```js
const Greetings = () => {
    const { isMobile } = useIsMobile();
    
    if (isMobile) {
        return (<p>Hello mobile!</p>);
    }
    
    return (<p>Hello desktop!</p>);
};

export default Greetings;
```

### Rendering components with `Responsive` render prop component

```js
<ResponsiveProvider>
    <App>
        <Responsive>
            { (responsive) => ( <Component1 currentBreakpoint={ responsive.mediaType } /> ) }
        </Responsive>
        <Responsive>
            { (responsive) => ( <Component2 orientation={ responsive.orientation } /> ) }
        </Responsive>
    </App>
</ResponsiveProvider>
```

### Rendering components with `withResponsive` High-Order component

```js
class Greetings extends Component {
    render() {
        return this.props.responsive.lessThan.sm ? <p>Hello small screen!</p> : <p>Hello big/small screen!</p>
    }
}

export default withResponsive(Greetings);
```

### Rendering components with `withIsMobile` High-Order component

```js
class Greetings extends Component {
    render() {
        return this.props.isMobile ? <p>Hello mobile!</p> : <p>Hello desktop!</p>
    }
}

export default withIsMobile(Greetings);
```

## Additional notes

### The `_initial` media type

The gap between window width 0 and the first breakpoint is called `_initial` media type.

It fixes a problem at `redux-responsive` in the calculation: 

If the first breakpoint starts in a number bigger than 0 (let's call it X), it considers that everything between 0 and X as the first breakpoint when it's not true.

For example, our breakpoints start at 320 (XS), `redux-responsive` considers 270 as XS, a wrong calculation. We call it `_initial`.

### The `isPhone` and `isDesktop` deprecation
If you're migration from the 0.X versions, the `isPhone` and `isDesktop` variables were deprecated.

After some discussions, we decided that maintaining the `isMobile`, `isPhone` and `isDesktop` was useless. 

They were always aliases for predefined breakpoints and still can be done manually.

We kept only the `isMobile` for some reasons:
1. It can be used for mobile/desktop code splitting in the future, optimizing builds for mobile only;
2. Per definition, the Mobile Site is just for phones. Tablets are desktop;
3. The `isMobile` detection is the most common use-case of the provider;
4. The `isDesktop` is just a negation of the `isMobile`;
5. They were available just for the `responsive` high-order component; 
6. You can still do the detection of specific breakpoints using the query objects.

## React compatibility

React >= `16.8.0` is required to use this package as the `ResponsiveProvider` is hook-based. 

The non-hook APIs just expose the `useResponsive` hook with different APIs, for compatibility with class components.

## Contributing

Read the [Contributing guidelines](./docs/CONTRIBUTING.md)

### Disclaimer

By sending us your contributions, you are agreeing that your contribution is made subject to the terms of our [Contributor Ownership Statement](https://github.com/Farfetch/.github/blob/master/COS.md)

## Maintainers

* [dinospereira](https://github.com/dinospereira)
* [SoaresMG](https://github.com/SoaresMG)
* [sofiacteixeira](https://github.com/sofiacteixeira)
* [themariamarques](https://github.com/themariamarques)

## License

[MIT](./LICENSE) 
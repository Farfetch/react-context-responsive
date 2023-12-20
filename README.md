# react-context-responsive

> This project is no longer being actively maintained.
FARFETCH has decided to archive this project, as widely adopted alternatives, like [react-responsive](https://www.npmjs.com/package/react-responsive), have become available.
> 
> We won't be accepting pull requests or responding to issues for this project anymore. Thank you for your understanding.

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
| Prop               | Type    | Required | Default | Description                                                                   |
| ------------------ | ------- | ---------|---------|-------------------------------------------------------------------------------|
| initialMediaType   | '_initial' <br>&#124;&nbsp; 'xs' <br>&#124;&nbsp; 'sm' <br>&#124;&nbsp; 'md' <br>&#124;&nbsp; 'lg'  <br>&#124;&nbsp;  'xl'| no    | 'xs'       |  Initial media type before the calculation of the real measures  |
| defaultOrientation | 'landscape' <br>&#124;&nbsp; 'portrait'  | no    | null       | Initial orientation before the calculation of the real measures    |
| children           | node  | yes     | -       | React component |
| breakpoints        | { xs: string, sm: string, md: string, lg: string, xl: string }  | no    | -       | Min breakpoints     |
| breakpointsMax     | { xs: string, sm: string, md: string, lg: string, xl: string }  | no    | -       | Max breakpoints |
| mediaQueries       | { _initial: string, xs: string, sm: string, md: string, lg: string, xl: string }  | no    | -       | Represents the screen media queries `(If this is passed, breakpoints and breakpointsMax props are obsolete)`  |
| mobileBreakpoint   | '_initial' <br>&#124;&nbsp; 'xs' <br>&#124;&nbsp; 'sm' <br>&#124;&nbsp; 'md' <br>&#124;&nbsp; 'lg'  <br>&#124;&nbsp;  'xl'  | no    | -       | It's considered mobile until this breakpoint |

## Object returned by the useResponsive / withResponsive / Responsive:

| Key                    | Type    | Description                                                                                  |
|------------------------|---------|----------------------------------------------------------------------------------------------|
| mediaType              | '_initial' <br>&#124;&nbsp; 'xs' <br>&#124;&nbsp; 'sm' <br>&#124;&nbsp; 'md' <br>&#124;&nbsp; 'lg'  <br>&#124;&nbsp;  'xl'  | Current breakpoint name|
| orientation            | string  | Current browser orientation |
| isCalculated           | boolean | False on first render. Once true, it means all breakpoints values are based on the window. |
| is                     | { _initial: boolean, xs: boolean, sm: boolean, md: boolean, lg: boolean, xl: boolean }  | Object key breakpoint name and value boolean that shows if width is at a certain breakpoint  |
| lessThan               | { _initial: boolean, xs: boolean, sm: boolean, md: boolean, lg: boolean, xl: boolean }  | Object key breakpoint name and value boolean that shows if width is less than a certain breakpoint |
| greaterThan               | { _initial: boolean, xs: boolean, sm: boolean, md: boolean, lg: boolean, xl: boolean }  | Object key breakpoint name and value boolean that shows if width is greater than a certain breakpoint |

## Object returned by the useIsMobile / withIsMobile:

| Key                    | Type    | Description                                                                                  |
|------------------------|---------|----------------------------------------------------------------------------------------------|
| isMobile | boolean | If it's below the mobile breakpoint defined by mobileBreakpoint |
| isCalculated           | boolean | False on first render. Once true, it means all breakpoints values are based on the window. |
   
## Usage and examples

To use the package, you must embrace your code with the `ResponsiveProvider`, following the guidelines.

The component has five different exported consumption APIs:

- `useResponsive`: A hook which returns the responsive object
- `useIsMobile`: A hook which returns an object with `isMobile` and `isCalculated`
- `Responsive`: A render prop component
- `withResponsive`: A HoC which passes the responsive data to the `responsive` prop
- `withIsMobile`: A HoC which passes `isMobile` and `isCalculated` props only

### How to setup

There are two possible options to configure your responsive provider with `breakpoints` or with `mediaQueries`

Using `breakpoints` and `breakpointsMax`
```js
const breakpoints = {
  xs: "320px",
  sm: "576px",
  md: "960px",
  lg: "1280px",
  xl: "1800px"
};

const breakpointsMax = {
  xs: "319px",
  sm: "575px",
  md: "959px",
  lg: "1279px",
  xl: "1799px"
};

const App = () => {
    
    return (
        <ResponsiveProvider breakpoints={breakpoints} breakpointsMax={breakpointsMax}>
            <Content />
        </ResponsiveProvider>
    );
};

export default App;
```

Using `mediaQueries`
```js
const mediaQueries = {
  _initial: "(min-width: 0px) and (max-width: 319px)",
  xs: "(min-width: 320px) and (max-width: 575px)",
  sm: "(min-width: 576px) and (max-width: 959px)",
  md: "(min-width: 960px) and (max-width: 1279px)",
  lg: "(min-width: 1280px) and (max-width: 1799px)",
  xl: "(min-width: 1800px)"
};

const App = () => {
    
    return (
        <ResponsiveProvider mediaQueries={mediaQueries}>
            <Content />
        </ResponsiveProvider>
    );
};

export default App;
```

### How to consume the package

#### Rendering components with `useResponsive` hook. (Preferred method)

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

#### Rendering components with `useIsMobile` hook. (Preferred method)

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

#### Rendering components with `Responsive` render prop component

```js

class Greetings extends Component {
    render() {
        return (
            <ResponsiveProvider>
                <Content>
                    <Responsive>
                        { (responsive) => ( <Component1 currentBreakpoint={ responsive.mediaType } /> ) }
                    </Responsive>
                    <Responsive>
                        { (responsive) => ( <Component2 orientation={ responsive.orientation } /> ) }
                    </Responsive>
                </Content>
            </ResponsiveProvider>
        )
    }
}

export default Greetings;
```

#### Rendering components with `withResponsive` High-Order component

```js
class Greetings extends Component {
    render() {
        return this.props.responsive.lessThan.sm ? <p>Hello small screen!</p> : <p>Hello big/small screen!</p>
    }
}

export default withResponsive(Greetings);
```

#### Rendering components with `withIsMobile` High-Order component

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
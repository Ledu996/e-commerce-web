export function Layout (props) {
    return (
        <div className="main__layout" style={{display: 'flex', flexDirection: 'column'}}>
            {props.children}
        </div>
    )
}
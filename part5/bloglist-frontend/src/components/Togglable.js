import React, { useState, useImperativeHandle } from 'react';

const Togglable = React.forwardRef((props, ref) => {
	const [visible, setVisible] = useState(false);
	const showWhenVisible = { display: visible ? '' : 'none' };
	const hideWhenVisible = { display: visible ? 'none' : '' };

	const toggleVisibility = () => {
		setVisible(!visible);
	};

	useImperativeHandle(ref, () => ({
		toggleVisibility
	}));

	return (
		<div>
			<div style={hideWhenVisible}>
				<button onClick={toggleVisibility}>{props.labelButton}</button>
			</div>
			<div style={showWhenVisible} id='create-blog-form'>
				{ props.children }
				<button onClick={toggleVisibility}>cancel</button>
			</div>
		</div>
	);
});

Togglable.displayName = 'Togglable';

export default Togglable;
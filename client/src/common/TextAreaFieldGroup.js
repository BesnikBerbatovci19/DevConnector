import React from 'react'
import classnames from 'classnames'

const TextAreaFieldGroup = ({
    name,
    placeholder,
    value,
    error,
    info,
    onChange,
}) => {
    return(
        <div className="form-group">
            <textarea 
            className={classnames('form-control', {'is-invalid': error})} 
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            name={name}
           />
            {info && <small className="form-text text-muted">{info}</small>}
           {error}
        </div>
    )
}

export default TextAreaFieldGroup;
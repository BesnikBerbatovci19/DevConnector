import React from 'react'
import classnames from 'classnames'

const TextFieldGroup = ({
    name,
    placeholder,
    value,
    label,
    error,
    info,
    type,
    onChange,
    disabled
}) => {
    return(
        <div className="form-group">
            <input  type={type} 
            className={classnames('form-control', {'is-invalid': error})} 
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            name={name}
            disabled={disabled}/>
            {info && <small className="form-text text-muted">{info}</small>}
           {error}
        </div>
    )
}

export default TextFieldGroup;
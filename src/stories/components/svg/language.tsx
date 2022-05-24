import * as React from 'react';

interface Props {
  width?: number;
  height?: number;
  fill?: string;
  onClick?: () => void;
}

const Language = ({
  width = 28,
  height = 28,
  fill = '#898989',
  onClick,
  ...props
}: Props) => {
  return (
    <svg
      style={{
        cursor: 'pointer',
        padding: '2px'
      }}
      onClick={onClick}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M13.987.667C6.627.667.667 6.64.667 14s5.96 13.333 13.32 13.333c7.373 0 13.347-5.973 13.347-13.333S21.36.667 13.987.667zm9.24 8h-3.933a20.87 20.87 0 00-1.84-4.747 10.707 10.707 0 015.773 4.746zM14 3.386a18.78 18.78 0 012.547 5.28h-5.093A18.783 18.783 0 0114 3.386zM3.68 16.666A10.989 10.989 0 013.334 14c0-.92.133-1.813.346-2.667h4.507C8.08 12.213 8 13.093 8 14c0 .906.08 1.787.187 2.666H3.68zm1.094 2.666h3.933a20.866 20.866 0 001.84 4.747 10.65 10.65 0 01-5.773-4.747zM8.707 8.667H4.774a10.65 10.65 0 015.773-4.747 20.867 20.867 0 00-1.84 4.746zM14 24.612a18.784 18.784 0 01-2.546-5.28h5.093A18.781 18.781 0 0114 24.613zm3.12-7.947h-6.24c-.12-.88-.213-1.76-.213-2.666 0-.907.093-1.8.213-2.667h6.24c.12.867.214 1.76.214 2.667 0 .906-.094 1.787-.214 2.666zm.334 7.414c.8-1.48 1.413-3.08 1.84-4.747h3.933a10.707 10.707 0 01-5.773 4.747zm2.36-7.413c.106-.88.186-1.76.186-2.667 0-.907-.08-1.787-.186-2.667h4.506c.214.854.347 1.747.347 2.667 0 .92-.133 1.813-.347 2.666h-4.506z'
        fill={fill}
      />
    </svg>
  );
};

export default Language;

const Filter = ({ filter, handleShowChange }) => {
  return (
    <div>
      filter shown with <input value={filter} onChange={handleShowChange} />
    </div>
  )
}
export default Filter
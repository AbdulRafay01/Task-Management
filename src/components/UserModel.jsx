
function UserModal({ user, isOpen, onClose }) {
  if (!isOpen || !user) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 text-center rounded-lg max-w-md w-full relative">
        <h2 className="text-xl font-bold mb-4">User Details</h2>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Department:</strong> {user.department}</p>
        <p><strong>Designation:</strong> {user.designation}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Address:</strong> {user.address}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <p><strong>Active:</strong> {user.is_active ? "Yes" : "No"}</p>
        <button onClick={onClose} 
         className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"> Close
        </button>
      </div>
    </div>
  )
}

export default UserModal

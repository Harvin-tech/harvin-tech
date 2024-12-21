import Image from 'next/image'
import React from 'react'
import { PiDotsThreeOutlineVertical } from 'react-icons/pi'

const RightSidebar = () => {
  // You can replace these with actual user data from your authentication system
  const user = {
    name: 'Shiva',
    profileImage: '/harvinlogo.jpg', // Replace with actual image path
  }

  // Function to get greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good Morning'
    if (hour < 18) return 'Good Afternoon'
    return 'Good Evening'
  }

  return (
    <div className="w-[210px] xl:w-[250px] bg-card p-4 shadow-lg min-h-[600px] hidden xl:block">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-medium text-muted-foreground">Your Profile</span>
        <button className="text-muted-foreground hover:text-foreground transition-colors">
          <PiDotsThreeOutlineVertical  size={16} />
        </button>
      </div>
      <div className="flex flex-col items-center space-y-4">
        {/* Profile Image */}
        <div className="relative w-20 h-20 rounded-full p-4 border-2 border-border">
          <Image
            src={user.profileImage}
            alt="Profile picture"
            fill
            className="object-contain p-2"
          />
        </div>

        {/* User Name */}
        <h2 className="text-xl font-semibold text-foreground">
          {user.name}
        </h2>

        {/* Greeting */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">
            {getGreeting()} {user.name}
          </h1>
          <p className="mt-2 text-muted-foreground">
            Continue your journey and achieve Your Target
          </p>
        </div>

        {/* You can add more content below */}
        <div className="mt-6 w-full">
          {/* Add additional components or information here */}
        </div>
      </div>
    </div>
  )
}

export default RightSidebar

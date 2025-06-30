<script lang="ts">
  export let fullName: string
  export let size: number = 40

  // Function to get initials from fullName
  const getInitials = (fullName: string): string => {
    return fullName
      .split(' ')
      .map(name => name.charAt(0).toUpperCase())
      .join('')
      .substring(0, 2) // Limit to 2 characters
  }

  // Function to generate a consistent color based on the name
  const getAvatarColor = (fullName: string): string => {
    const colors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
      '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
      '#F8C471', '#82E0AA', '#F1948A', '#85C1E9', '#D7BDE2'
    ]

    // Generate a hash from the name to get consistent color
    let hash = 0;
    for (let i = 0; i < fullName.length; i++) {
      hash = fullName.charCodeAt(i) + ((hash << 5) - hash)
    }

    return colors[Math.abs(hash) % colors.length]
  }
</script>

<div
  class="avatar"
  style="
    width: {size}px;
    height: {size}px;
    background-color: {getAvatarColor(fullName)};
    font-size: {size * 0.4}px;"
>
  {getInitials(fullName)}
</div>

<style>
  .avatar {
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    color: white;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    user-select: none;
  }
</style>

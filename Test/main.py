import numpy as np
import matplotlib.pyplot as plt
import matplotlib.animation as animation

# Heart parametric equations
def heart_shape(t):
    x = 16 * np.sin(t) ** 3
    y = 13 * np.cos(t) - 5 * np.cos(2 * t) - 2 * np.cos(3 * t) - np.cos(4 * t)
    return x, y

# Animation function
def animate(i):
    scale = 1 + 0.05 * np.sin(i * 0.1)  # Simulates the beating effect
    line.set_data(x * scale, y * scale)
    return line,

# Create figure
fig, ax = plt.subplots()
t = np.linspace(0, 2 * np.pi, 1000)
x, y = heart_shape(t)
line, = ax.plot(x, y, color='red')

# Set limits and aspect ratio
ax.set_xlim([-20, 20])
ax.set_ylim([-20, 20])
ax.set_aspect('equal')

# Create animation
ani = animation.FuncAnimation(fig, animate, frames=100, interval=50, blit=True)

# Show animation
plt.show()

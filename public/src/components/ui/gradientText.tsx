import { useState, useEffect, useRef, type ReactNode } from 'react';
import { motion, useMotionValue, useAnimationFrame, useTransform } from 'motion/react';

type Directions = "horizontal" | "vertical" | "diagonal";

interface GradientTextProps {
    children: ReactNode;
    className?: string;
    colors: string[];
    animationSpeed: number;
    showBorder: boolean;
    direction: Directions
    yoyo: boolean;
};


export const GradientText = ({
    children,
    className,
    colors,
    animationSpeed,
    showBorder,
    direction,
    yoyo
}: GradientTextProps) => {
    const [isPaused] = useState(false);
    const progress = useMotionValue(0);
    const elapsedRef = useRef(0);
    const lastTimeRef = useRef<number | null>(null);

    const animationDuration = animationSpeed * 1000;

    useAnimationFrame(time => {
        if (isPaused) {
            lastTimeRef.current = null;
            return;
        }

        if (lastTimeRef.current === null) {
            lastTimeRef.current = time;
            return;
        }

        const deltaTime = time - lastTimeRef.current;
        lastTimeRef.current = time;
        elapsedRef.current += deltaTime;

        if (yoyo) {
            const fullCycle = animationDuration * 2;
            const cycleTime = elapsedRef.current % fullCycle;

            if (cycleTime < animationDuration) {
                progress.set((cycleTime / animationDuration) * 100);
            } else {
                progress.set(100 - ((cycleTime - animationDuration) / animationDuration) * 100);
            }
        } else {
            progress.set((elapsedRef.current / animationDuration) * 100);
        }
    });

    useEffect(() => {
        elapsedRef.current = 0;
        progress.set(0);
    }, [animationSpeed, yoyo]);

    const backgroundPosition = useTransform(progress, p => {
        if (direction === 'horizontal') {
            return `${p}% 50%`;
        } else if (direction === 'vertical') {
            return `50% ${p}%`;
        } else {
            return `${p}% 50%`;
        }
    });


    const gradientAngle =
        direction === 'horizontal' ? 'to right' : direction === 'vertical' ? 'to bottom' : 'to bottom right';
    const gradientColors = [...colors, colors[0]].join(', ');

    const gradientStyle = {
        backgroundImage: `linear-gradient(${gradientAngle}, ${gradientColors})`,
        backgroundSize: direction === 'horizontal' ? '300% 100%' : direction === 'vertical' ? '100% 300%' : '300% 300%',
        backgroundRepeat: 'repeat'
    };

    return (
        <motion.div
            className={`inline-block ${className}`}
        >
            {showBorder && (
                <motion.div
                    className="inline-block inset-0"
                    style={{ ...gradientStyle, backgroundPosition }}
                >
                    <div
                        className="inline-block"
                        style={{
                            width: 'calc(100% - 2px)',
                            height: 'calc(100% - 2px)',
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%, -50%)'
                        }}
                    />
                </motion.div>
            )}
            <motion.div
                className="relative text-transparent"
                style={{ ...gradientStyle, backgroundPosition, WebkitBackgroundClip: 'text' }}
            >
                {children}
            </motion.div>
        </motion.div>
    );
}

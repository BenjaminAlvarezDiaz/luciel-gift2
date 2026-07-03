import React, { useRef, useState, useEffect } from "react";
import styles from "../styles/Circle.module.css";

function Circle (){

    const canvasRef = useRef(null);

    useEffect( () => {

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        canvas.width = 300;
        canvas.height = 300;

        const centerX = 150;
        const centerY = 150;

        const borderRadius = 130;

        const ball = {

            x:150,
            y:60,

            radius:10,

            vx:2,
            vy:0

        };

        let hue = 0;

        const gravity = .18;

        let animationId;

        function resetBall(){

            ball.x = 150;
            ball.y = 60;

            ball.radius = 10;

            ball.vx = 2;
            ball.vy = 0;

            hue = 0;

        }

        function update(){

            ctx.clearRect(0,0,300,300);

            ball.vy += gravity;

            ball.x += ball.vx;
            ball.y += ball.vy;

            const dx = ball.x-centerX;
            const dy = ball.y-centerY;

            const distance = Math.sqrt(dx*dx+dy*dy);

            if(distance + ball.radius >= borderRadius){

                const nx = dx / distance;
                const ny = dy / distance;

                const dot =
                    ball.vx * nx +
                    ball.vy * ny;

                ball.vx -= 2 * dot * nx;
                ball.vy -= 2 * dot *  ny;

                const overlap =
                    distance + ball.radius - borderRadius;

                ball.x -= nx * overlap;
                ball.y -= ny * overlap;

                ball.radius *= 1.01;

            }

            if(ball.radius >= borderRadius * 0.99){
                resetBall();
            }

            hue = (hue + 1) % 360;

            ctx.strokeStyle = "white";
            ctx.lineWidth = 3;

            ctx.beginPath();

            ctx.arc(
                centerX,
                centerY,
                borderRadius,
                0,
                Math.PI * 2
            );

            ctx.stroke();

            ctx.fillStyle = `hsl(${hue},100%,50%)`;

            ctx.beginPath();

            ctx.arc(
                ball.x,
                ball.y,
                ball.radius,
                0,
                Math.PI*2
            );

            ctx.fill();

            animationId = requestAnimationFrame(update);

        }

        update();

        return () => {
            cancelAnimationFrame(animationId);
        };

    },[]);

    return (
        <div className={styles.main_container}>
            <div className={styles.circle}>
                <canvas 
                    ref={canvasRef}
                    className={styles.animation}
                />
            </div>
        </div>
    );
}

export default Circle;
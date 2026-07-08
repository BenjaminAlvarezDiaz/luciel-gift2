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

        const bounce = 0.92;
        const minSpeed = 2;
        const maxSpeed = 19;

        let animationId;

        let dragging = false;

        let lastMouseX = 0;
        let lastMouseY = 0;

        let lastBallX = 0;
        let lastBallY = 0;

        function resetBall(){

            ball.x = 150;
            ball.y = 60;

            ball.radius = 10;

            ball.vx = 2;
            ball.vy = 0;

            hue = 0;

        }

        function getPointerPosition(e){

            const rect = canvas.getBoundingClientRect();

            return {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };

        }

        canvas.addEventListener("pointerdown",(e)=>{

            e.preventDefault();

            canvas.setPointerCapture(e.pointerId);

            const mouse = getPointerPosition(e);

            const dx = mouse.x - ball.x;
            const dy = mouse.y - ball.y;

            if(Math.sqrt(dx*dx+dy*dy)<=ball.radius){

                dragging = true;

                lastMouseX = mouse.x;
                lastMouseY = mouse.y;

                ball.vx = 0;
                ball.vy = 0;

            }

        });

        canvas.addEventListener("pointermove",(e)=>{

            if(!dragging) return;

            const mouse = getPointerPosition(e);

            const dx = mouse.x-centerX;
            const dy = mouse.y-centerY;

            const distance = Math.sqrt(dx*dx+dy*dy);

            if(distance > borderRadius-ball.radius){

                const angle = Math.atan2(dy,dx);

                ball.x =
                    centerX +
                    Math.cos(angle)*
                    (borderRadius-ball.radius);

                ball.y =
                    centerY +
                    Math.sin(angle)*
                    (borderRadius-ball.radius);

            }else{

                ball.x = mouse.x;
                ball.y = mouse.y;

            }

            ball.vx = mouse.x - lastMouseX;
            ball.vy = mouse.y - lastMouseY;

            const speed = Math.sqrt(ball.vx**2 + ball.vy**2);

            if(speed > maxSpeed){

                ball.vx = ball.vx / speed * maxSpeed;
                ball.vy = ball.vy / speed * maxSpeed;

            }

            lastMouseX = mouse.x;
            lastMouseY = mouse.y;

        });

        window.addEventListener("pointerup",()=>{

            dragging=false;

        });

        function update(){

            ctx.clearRect(0,0,300,300);

            if(!dragging){

                ball.vy += gravity;

                ball.x += ball.vx;
                ball.y += ball.vy;

            }

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
                ball.vy -= 2 * dot * ny;

                ball.vx *= bounce;
                ball.vy *= bounce;

                const speed = Math.sqrt(ball.vx * ball.vx + ball.vy * ball.vy);

                if(speed < minSpeed){

                    const factor = minSpeed / (speed || 1);

                    ball.vx *= factor;
                    ball.vy *= factor;

                }

                const horizontalMin = 3;

                if(Math.abs(ball.vx) < horizontalMin){

                    ball.vx = Math.sign(ball.vx || 1) * horizontalMin;

                }

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
                <div className={styles.circle_catch}>Atrapa la pelotita</div>
                <canvas 
                    ref={canvasRef}
                    className={styles.animation}
                />
            </div>
        </div>
    );
}

export default Circle;
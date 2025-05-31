import React, { useState, useEffect } from 'react';
import { Container, PostCard } from '../components';
import { Query } from 'appwrite';
import { useSelector } from 'react-redux';
import service from '../appwrite/config';
import authService from '../appwrite/auth';

function Home() {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [userId, setUserId] = useState(null);
    const user = useSelector((state) => state.auth.status);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const isuser = await authService.getCurrentUser();
                if (isuser) {
                    setUserId(isuser.$id);
                    const response = await service.getPosts([
                        Query.equal("status", "active"),
                        Query.equal("userId", isuser.$id),
                    ]);
                    setPosts(response.documents || []);
                } else {
                    setPosts([]);
                }
            } catch (err) {
                console.error("Failed to fetch posts:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPosts();
    }, [user]);

    if (isLoading) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <h1 className="text-2xl font-bold">Loading posts...</h1>
                </Container>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <h1 className="text-2xl font-bold">Login to read posts</h1>
                </Container>
            </div>
        );
    }

    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <h1 className="text-2xl font-bold">No posts found</h1>
                </Container>
            </div>
        );
    }

    return (
        <div className="py-8">
            <Container>
                <div className="columns-1 sm:columns-2 md:columns-3 gap-4">
                    {posts.map((post) => (
                        <div key={post.$id} className="mb-4 break-inside-avoid">
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default Home;

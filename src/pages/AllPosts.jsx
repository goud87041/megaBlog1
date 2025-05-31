import React, { useState, useEffect } from 'react'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/config";
import authService from "../appwrite/auth"; // using your AuthService
import { Query } from 'appwrite'; // import Query to filter by userId

function AllPosts() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                // Get current logged-in user
                const user = await authService.getCurrentUser();

                if (user) {
                    // Query posts where userId matches current user AND status is active
                    const queries = [
                        Query.equal("userId", user.$id),
                        Query.equal("status", "active"),
                    ];

                    const response = await appwriteService.getPosts(queries);

                    if (response) {
                        setPosts(response.documents);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch user posts:", error);
            }
        };

        fetchUserPosts();
    }, []);

    return (
        <div className='w-full py-8 '>
            <Container>
                <div className='columns-1 sm:columns-2 md:columns-3 gap-4 '>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2  break-inside-avoid '>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default AllPosts

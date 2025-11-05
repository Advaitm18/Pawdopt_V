import React, { useState, useRef, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './components/ui/dialog';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Button } from './components/ui/button';
import { Card } from './components/ui/card';
import { Textarea } from './components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { Badge } from './components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Separator } from './components/ui/separator';
import { Switch } from './components/ui/switch';
import { toast } from 'sonner@2.0.3';
import { Mail, Phone, MapPin, Clock, Facebook, Instagram, Twitter, Play, Pause, Volume2, VolumeX, Heart, Filter, Search, Moon, Sun, Share2, GitCompare, X, CheckCircle, ArrowRight } from 'lucide-react';

interface Pet {
  id: number;
  name: string;
  age: string;
  image: string;
  species: string;
  ageInYears: number;
  breed: string;
  gender: string;
  weight: string;
  vaccinated: boolean;
  neutered: boolean;
  personality: string[];
  description: string;
  color: string;
}

const pets: Pet[] = [
  {
    id: 1,
    name: "Buddy",
    age: "3 years",
    ageInYears: 3,
    image: "https://images.unsplash.com/photo-1687211818108-667d028f1ae4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkZW4lMjByZXRyaWV2ZXIlMjBkb2d8ZW58MXx8fHwxNzU5OTY1OTI0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    species: "Dog",
    breed: "Golden Retriever",
    gender: "Male",
    weight: "65 lbs",
    vaccinated: true,
    neutered: true,
    personality: ["Friendly", "Energetic", "Loyal"],
    description: "Buddy is a sweet and playful Golden Retriever who loves to play fetch and go for long walks. He's great with kids and other dogs!",
    color: "Golden"
  },
  {
    id: 2,
    name: "Whiskers",
    age: "2 years",
    ageInYears: 2,
    image: "https://images.unsplash.com/photo-1625192494235-21e8821040c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWJieSUyMGNhdCUyMHBvcnRyYWl0fGVufDF8fHx8MTc1OTk4NjEzOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    species: "Cat",
    breed: "Tabby",
    gender: "Female",
    weight: "10 lbs",
    vaccinated: true,
    neutered: true,
    personality: ["Independent", "Calm", "Affectionate"],
    description: "Whiskers is a gentle tabby cat who enjoys quiet afternoons and gentle petting. She's perfect for a calm household.",
    color: "Brown Tabby"
  },
  {
    id: 3,
    name: "Charlie",
    age: "1 year",
    ageInYears: 1,
    image: "https://images.unsplash.com/photo-1606833694770-40a04762ac16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFnbGUlMjBwdXBweXxlbnwxfHx8fDE3NjAwMTA1NTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    species: "Dog",
    breed: "Beagle",
    gender: "Male",
    weight: "25 lbs",
    vaccinated: true,
    neutered: false,
    personality: ["Curious", "Playful", "Intelligent"],
    description: "Charlie is a young beagle full of energy and curiosity. He loves exploring and would do great in an active family.",
    color: "Tri-color"
  },
  {
    id: 4,
    name: "Luna",
    age: "4 years",
    ageInYears: 4,
    image: "https://images.unsplash.com/photo-1568152950566-c1bf43f4ab28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWFtZXNlJTIwY2F0fGVufDF8fHx8MTc2MDAyNDI2MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    species: "Cat",
    breed: "Siamese",
    gender: "Female",
    weight: "9 lbs",
    vaccinated: true,
    neutered: true,
    personality: ["Vocal", "Intelligent", "Social"],
    description: "Luna is a beautiful Siamese cat who loves to chat and be the center of attention. Very smart and loving!",
    color: "Seal Point"
  },
  {
    id: 5,
    name: "Max",
    age: "5 years",
    ageInYears: 5,
    image: "https://images.unsplash.com/photo-1718578851384-c1d16427ec2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWJyYWRvciUyMGRvZ3xlbnwxfHx8fDE3NTk5MTkxNzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    species: "Dog",
    breed: "Labrador",
    gender: "Male",
    weight: "70 lbs",
    vaccinated: true,
    neutered: true,
    personality: ["Gentle", "Patient", "Loving"],
    description: "Max is a calm and loving Labrador who adores everyone he meets. Perfect family dog with a heart of gold.",
    color: "Black"
  },
  {
    id: 6,
    name: "Princess",
    age: "3 years",
    ageInYears: 3,
    image: "https://images.unsplash.com/photo-1585137173132-cf49e10ad27d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzaWFuJTIwY2F0fGVufDF8fHx8MTc2MDAzMDA3NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    species: "Cat",
    breed: "Persian",
    gender: "Female",
    weight: "11 lbs",
    vaccinated: true,
    neutered: true,
    personality: ["Elegant", "Quiet", "Gentle"],
    description: "Princess is a gorgeous Persian cat who enjoys lounging in sunny spots. She's low-energy and very sweet.",
    color: "White"
  },
  {
    id: 7,
    name: "Rocky",
    age: "4 years",
    ageInYears: 4,
    image: "https://images.unsplash.com/photo-1590419690008-905895e8fe0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxodXNreSUyMGRvZ3xlbnwxfHx8fDE3NjIyMzcxMTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    species: "Dog",
    breed: "Husky",
    gender: "Male",
    weight: "55 lbs",
    vaccinated: true,
    neutered: true,
    personality: ["Active", "Adventurous", "Friendly"],
    description: "Rocky is an energetic Husky who needs an active family. He loves running, hiking, and cold weather!",
    color: "Gray & White"
  },
  {
    id: 8,
    name: "Coco",
    age: "2 years",
    ageInYears: 2,
    image: "https://images.unsplash.com/photo-1648316464836-afd11657c14a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3JnaSUyMGRvZ3xlbnwxfHx8fDE3NjIyNjY2NjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    species: "Dog",
    breed: "Corgi",
    gender: "Female",
    weight: "28 lbs",
    vaccinated: true,
    neutered: true,
    personality: ["Happy", "Smart", "Loyal"],
    description: "Coco is an adorable Corgi with a big personality. She's smart, trainable, and loves to make people smile!",
    color: "Tan & White"
  },
  {
    id: 9,
    name: "Tank",
    age: "1 year",
    ageInYears: 1,
    image: "https://images.unsplash.com/photo-1633717556731-b380ea2a79b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidWxsZG9nJTIwcHVwcHl8ZW58MXx8fHwxNzYyMjMwNTYxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    species: "Dog",
    breed: "Bulldog",
    gender: "Male",
    weight: "40 lbs",
    vaccinated: true,
    neutered: false,
    personality: ["Calm", "Friendly", "Stubborn"],
    description: "Tank is a sweet bulldog puppy with a laid-back personality. He's great for apartment living!",
    color: "Brindle"
  },
  {
    id: 10,
    name: "Spot",
    age: "6 years",
    ageInYears: 6,
    image: "https://images.unsplash.com/photo-1626435872669-8bcb32be46dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYWxtYXRpYW4lMjBkb2d8ZW58MXx8fHwxNzYyMjc4MjczfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    species: "Dog",
    breed: "Dalmatian",
    gender: "Male",
    weight: "60 lbs",
    vaccinated: true,
    neutered: true,
    personality: ["Active", "Protective", "Loyal"],
    description: "Spot is a beautiful Dalmatian who loves to run and play. He's protective and loyal to his family.",
    color: "White with Black Spots"
  },
  {
    id: 11,
    name: "Fluffy",
    age: "3 years",
    ageInYears: 3,
    image: "https://images.unsplash.com/photo-1651273427958-bf78352e39be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb29kbGUlMjBkb2d8ZW58MXx8fHwxNzYyMjA1MDM3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    species: "Dog",
    breed: "Poodle",
    gender: "Female",
    weight: "45 lbs",
    vaccinated: true,
    neutered: true,
    personality: ["Intelligent", "Elegant", "Playful"],
    description: "Fluffy is a smart and elegant poodle who loves learning new tricks. Great for families with allergies!",
    color: "White"
  },
  {
    id: 12,
    name: "Duke",
    age: "5 years",
    ageInYears: 5,
    image: "https://images.unsplash.com/photo-1605725657590-b2cf0d31b1a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnZXJtYW4lMjBzaGVwaGVyZHxlbnwxfHx8fDE3NjIyMDAxNjd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    species: "Dog",
    breed: "German Shepherd",
    gender: "Male",
    weight: "80 lbs",
    vaccinated: true,
    neutered: true,
    personality: ["Confident", "Smart", "Brave"],
    description: "Duke is a well-trained German Shepherd who would excel as a family protector. Very obedient and loving.",
    color: "Black & Tan"
  },
  {
    id: 13,
    name: "Peanut",
    age: "4 years",
    ageInYears: 4,
    image: "https://images.unsplash.com/photo-1553698217-934b000f1f00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdWclMjBkb2d8ZW58MXx8fHwxNjIyNTA2MTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    species: "Dog",
    breed: "Pug",
    gender: "Male",
    weight: "18 lbs",
    vaccinated: true,
    neutered: true,
    personality: ["Charming", "Playful", "Loving"],
    description: "Peanut is a charming little pug who loves to cuddle and make people laugh. Perfect lap dog!",
    color: "Fawn"
  },
  {
    id: 14,
    name: "Tiny",
    age: "2 years",
    ageInYears: 2,
    image: "https://images.unsplash.com/photo-1610041518868-f9284e7eecfe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlodWFodWElMjBkb2d8ZW58MXx8fHwxNzYyMjc4Mjc1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    species: "Dog",
    breed: "Chihuahua",
    gender: "Female",
    weight: "6 lbs",
    vaccinated: true,
    neutered: true,
    personality: ["Sassy", "Alert", "Devoted"],
    description: "Tiny may be small but has a big personality! She's devoted to her owner and makes a great companion.",
    color: "Tan"
  },
  {
    id: 15,
    name: "Scout",
    age: "3 years",
    ageInYears: 3,
    image: "https://images.unsplash.com/photo-1568393691080-d016376b767d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib3JkZXIlMjBjb2xsaWV8ZW58MXx8fHwxNzYyMjUwNjE5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    species: "Dog",
    breed: "Border Collie",
    gender: "Female",
    weight: "38 lbs",
    vaccinated: true,
    neutered: true,
    personality: ["Energetic", "Intelligent", "Focused"],
    description: "Scout is a highly intelligent Border Collie who needs mental stimulation and exercise. Great for active owners!",
    color: "Black & White"
  },
  {
    id: 16,
    name: "Oscar",
    age: "7 years",
    ageInYears: 7,
    image: "https://images.unsplash.com/photo-1621757298894-7174d1b1bc40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYWNoc2h1bmQlMjBkb2d8ZW58MXx8fHwxNjIxNzU3Mjk4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    species: "Dog",
    breed: "Dachshund",
    gender: "Male",
    weight: "22 lbs",
    vaccinated: true,
    neutered: true,
    personality: ["Brave", "Curious", "Lively"],
    description: "Oscar is a senior Dachshund with plenty of spunk left. He loves short walks and cozy naps.",
    color: "Brown"
  },
  {
    id: 17,
    name: "Simba",
    age: "5 years",
    ageInYears: 5,
    image: "https://images.unsplash.com/photo-1606213651356-0272cc0becd2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWluZSUyMGNvb24lMjBjYXR8ZW58MXx8fHwxNzYyMTk2MTE2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    species: "Cat",
    breed: "Maine Coon",
    gender: "Male",
    weight: "18 lbs",
    vaccinated: true,
    neutered: true,
    personality: ["Gentle", "Sociable", "Playful"],
    description: "Simba is a majestic Maine Coon with a gentle giant personality. He's friendly with everyone!",
    color: "Orange Tabby"
  },
  {
    id: 18,
    name: "Oliver",
    age: "2 years",
    ageInYears: 2,
    image: "https://images.unsplash.com/photo-1629624467541-f73ef8f12df2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicml0aXNoJTIwc2hvcnRoYWlyJTIwY2F0fGVufDF8fHx8MTc2MjI3ODI3Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    species: "Cat",
    breed: "British Shorthair",
    gender: "Male",
    weight: "12 lbs",
    vaccinated: true,
    neutered: true,
    personality: ["Calm", "Easygoing", "Loyal"],
    description: "Oliver is a laid-back British Shorthair who enjoys a quiet life. Perfect for apartment living!",
    color: "Gray"
  },
  {
    id: 19,
    name: "Bella",
    age: "4 years",
    ageInYears: 4,
    image: "https://images.unsplash.com/photo-1620933288385-b2f6f1931d9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWdkb2xsJTIwY2F0fGVufDF8fHx8MTc2MjI3ODI3Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    species: "Cat",
    breed: "Ragdoll",
    gender: "Female",
    weight: "13 lbs",
    vaccinated: true,
    neutered: true,
    personality: ["Docile", "Affectionate", "Gentle"],
    description: "Bella is a sweet Ragdoll who goes limp when you pick her up. She's incredibly affectionate and gentle.",
    color: "Seal Point"
  },
  {
    id: 20,
    name: "Tiger",
    age: "3 years",
    ageInYears: 3,
    image: "https://images.unsplash.com/photo-1603277160434-df7471138363?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZW5nYWwlMjBjYXR8ZW58MXx8fHwxNzYyMjc4Mjc3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    species: "Cat",
    breed: "Bengal",
    gender: "Male",
    weight: "14 lbs",
    vaccinated: true,
    neutered: true,
    personality: ["Active", "Playful", "Curious"],
    description: "Tiger is an energetic Bengal with beautiful markings. He loves to climb, explore, and play!",
    color: "Brown Spotted"
  },
  {
    id: 21,
    name: "Shadow",
    age: "6 years",
    ageInYears: 6,
    image: "https://images.unsplash.com/photo-1503431128871-cd250803fa41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMGNhdHxlbnwxfHx8fDE3NjIyNDc2MDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    species: "Cat",
    breed: "Domestic Shorthair",
    gender: "Male",
    weight: "11 lbs",
    vaccinated: true,
    neutered: true,
    personality: ["Mysterious", "Quiet", "Loving"],
    description: "Shadow is a sleek black cat who's quiet and mysterious but very loving once he knows you.",
    color: "Black"
  },
  {
    id: 22,
    name: "Milo",
    age: "1 year",
    ageInYears: 1,
    image: "https://images.unsplash.com/photo-1712592000997-ea7ccaeb9725?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmFuZ2UlMjB0YWJieSUyMGNhdHxlbnwxfHx8fDE3NjIyNjc3MjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    species: "Cat",
    breed: "Domestic Shorthair",
    gender: "Male",
    weight: "8 lbs",
    vaccinated: true,
    neutered: false,
    personality: ["Energetic", "Playful", "Friendly"],
    description: "Milo is a young orange tabby full of energy and playfulness. He's friendly and loves to explore!",
    color: "Orange"
  },
  {
    id: 23,
    name: "Patches",
    age: "5 years",
    ageInYears: 5,
    image: "https://images.unsplash.com/photo-1503777119540-ce54b422baff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWxpY28lMjBjYXR8ZW58MXx8fHwxNzYyMTgzNzYwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    species: "Cat",
    breed: "Calico",
    gender: "Female",
    weight: "10 lbs",
    vaccinated: true,
    neutered: true,
    personality: ["Sassy", "Independent", "Sweet"],
    description: "Patches is a beautiful calico with a sassy personality. She's independent but very sweet when she wants attention.",
    color: "Calico"
  },
  {
    id: 24,
    name: "Oreo",
    age: "2 years",
    ageInYears: 2,
    image: "https://images.unsplash.com/photo-1572897263855-ea51655f9f0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0dXhlZG8lMjBjYXR8ZW58MXx8fHwxNzYyMjc4Mjc4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    species: "Cat",
    breed: "Tuxedo",
    gender: "Male",
    weight: "11 lbs",
    vaccinated: true,
    neutered: true,
    personality: ["Friendly", "Curious", "Smart"],
    description: "Oreo is a dapper tuxedo cat who's friendly and curious. He loves investigating everything!",
    color: "Black & White"
  },
  {
    id: 25,
    name: "Snowball",
    age: "4 years",
    ageInYears: 4,
    image: "https://images.unsplash.com/photo-1606208427954-aa8319c4815e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMGNhdHxlbnwxfHx8fDE3NjIyNzgyNzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    species: "Cat",
    breed: "Domestic Longhair",
    gender: "Female",
    weight: "12 lbs",
    vaccinated: true,
    neutered: true,
    personality: ["Elegant", "Calm", "Affectionate"],
    description: "Snowball is a stunning white cat with a calm and elegant demeanor. She loves gentle affection.",
    color: "White"
  },
  {
    id: 26,
    name: "Misty",
    age: "1 year",
    ageInYears: 1,
    image: "https://images.unsplash.com/photo-1689871404673-cc43adec4ae8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmF5JTIwa2l0dGVufGVufDF8fHx8MTc2MjE5NDgxNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    species: "Cat",
    breed: "Russian Blue",
    gender: "Female",
    weight: "7 lbs",
    vaccinated: true,
    neutered: false,
    personality: ["Playful", "Gentle", "Shy"],
    description: "Misty is a young Russian Blue kitten who's playful and gentle. She can be shy at first but warms up quickly!",
    color: "Gray"
  }
];

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    pet: "Buddy",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    text: "Adopting Buddy was the best decision we ever made! He's brought so much joy to our family. The PawDopt team was incredibly helpful throughout the entire process.",
    rating: 5
  },
  {
    id: 2,
    name: "Rahul Deshmukh",
    pet: "Luna",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    text: "Luna has been the perfect addition to our home. She's exactly as described - vocal, intelligent, and so loving. Thank you PawDopt!",
    rating: 5
  },
  {
    id: 3,
    name: "Anjali Patel",
    pet: "Max",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    text: "Max is the most gentle and patient dog. He's amazing with our kids and has become a true member of our family. Highly recommend PawDopt!",
    rating: 5
  }
];

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [activeSection, setActiveSection] = useState('home');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [contactFormData, setContactFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [speciesFilter, setSpeciesFilter] = useState<string>('all');
  const [ageFilter, setAgeFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [breedFilter, setBreedFilter] = useState<string>('all');
  const [darkMode, setDarkMode] = useState(false);
  const [compareList, setCompareList] = useState<number[]>([]);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [showPetDetailModal, setShowPetDetailModal] = useState(false);
  const [detailPet, setDetailPet] = useState<Pet | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleAdoptClick = (pet: Pet) => {
    setSelectedPet(pet);
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create adoption request object
    const adoptionRequest = {
      timestamp: new Date().toISOString(),
      applicant: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone
      },
      pet: {
        id: selectedPet?.id,
        name: selectedPet?.name,
        breed: selectedPet?.breed,
        species: selectedPet?.species,
        age: selectedPet?.age
      }
    };
    
    // Log to console so you can see the registration
    console.log('🐾 NEW ADOPTION REQUEST RECEIVED! 🐾');
    console.log('=====================================');
    console.table({
      'Applicant Name': adoptionRequest.applicant.name,
      'Email': adoptionRequest.applicant.email,
      'Phone': adoptionRequest.applicant.phone,
      'Pet Name': adoptionRequest.pet.name,
      'Pet Breed': adoptionRequest.pet.breed,
      'Pet Species': adoptionRequest.pet.species,
      'Timestamp': new Date(adoptionRequest.timestamp).toLocaleString()
    });
    console.log('Full Request Data:', adoptionRequest);
    console.log('=====================================');
    
    // Store in localStorage for persistence (so you can check later)
    const existingRequests = JSON.parse(localStorage.getItem('adoptionRequests') || '[]');
    existingRequests.push(adoptionRequest);
    localStorage.setItem('adoptionRequests', JSON.stringify(existingRequests));
    
    // Show creative success message
    const messages = [
      `🎉 Woohoo ${formData.name}! ${selectedPet?.name} is doing a happy dance! We'll reach out to you at ${formData.email} faster than a dog chasing a tennis ball! 🎾`,
      `💕 Amazing news ${formData.name}! ${selectedPet?.name} just wagged their tail so hard they almost took off! Check ${formData.email} soon for next steps! 🚀`,
      `🌟 Pawsome choice ${formData.name}! ${selectedPet?.name} can't wait to meet you! We'll contact you at ${formData.email} before you can say "walkies"! 🐕`,
      `✨ Fantastic ${formData.name}! ${selectedPet?.name} is already practicing their cuddle skills! Expect an email at ${formData.email} very soon! 🤗`,
      `🎊 Incredible ${formData.name}! ${selectedPet?.name} is purring/barking with excitement! We'll be in touch at ${formData.email} faster than you can fill a food bowl! 🍖`
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    toast.success(randomMessage, {
      duration: 6000
    });
    
    setIsModalOpen(false);
    setFormData({ name: '', email: '', phone: '' });
  };

  const handleContactFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create contact message object
    const contactMessage = {
      timestamp: new Date().toISOString(),
      name: contactFormData.name,
      email: contactFormData.email,
      subject: contactFormData.subject,
      message: contactFormData.message
    };
    
    // Log to console
    console.log('📧 NEW CONTACT MESSAGE RECEIVED! 📧');
    console.log('=====================================');
    console.table({
      'Name': contactMessage.name,
      'Email': contactMessage.email,
      'Subject': contactMessage.subject,
      'Timestamp': new Date(contactMessage.timestamp).toLocaleString()
    });
    console.log('Message:', contactMessage.message);
    console.log('=====================================');
    
    // Store in localStorage
    const existingMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    existingMessages.push(contactMessage);
    localStorage.setItem('contactMessages', JSON.stringify(existingMessages));
    
    const thankYouMessages = [
      `🌟 Thank you ${contactFormData.name}! Your message has landed in our inbox like a perfect frisbee catch! We'll reply to ${contactFormData.email} super soon! 🥏`,
      `💌 Got it ${contactFormData.name}! Your message is wagging its way to our team! Expect a reply at ${contactFormData.email} shortly! 🐕`,
      `✨ Awesome ${contactFormData.name}! Your message is purrfectly received! We'll get back to ${contactFormData.email} in a whisker! 🐱`,
      `🎯 Message received ${contactFormData.name}! We're on it faster than a cat pouncing on a laser pointer! Check ${contactFormData.email} soon! 🔴`
    ];
    
    const randomThankYou = thankYouMessages[Math.floor(Math.random() * thankYouMessages.length)];
    toast.success(randomThankYou, {
      duration: 5000
    });
    
    setContactFormData({ name: '', email: '', subject: '', message: '' });
  };

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section + '-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (section === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFavorite = (petId: number) => {
    setFavorites(prev => {
      if (prev.includes(petId)) {
        toast.info('Removed from favorites');
        return prev.filter(id => id !== petId);
      } else {
        toast.success('Added to favorites!');
        return [...prev, petId];
      }
    });
  };

  const isFavorite = (petId: number) => favorites.includes(petId);

  const toggleCompare = (petId: number) => {
    setCompareList(prev => {
      if (prev.includes(petId)) {
        toast.info('Removed from comparison');
        return prev.filter(id => id !== petId);
      } else if (prev.length >= 3) {
        toast.error('You can only compare up to 3 pets at a time');
        return prev;
      } else {
        toast.success('Added to comparison!');
        return [...prev, petId];
      }
    });
  };

  const isInCompare = (petId: number) => compareList.includes(petId);

  const sharePet = (pet: Pet) => {
    const text = `Check out ${pet.name}, a lovely ${pet.breed} available for adoption at PawDopt!`;
    const url = window.location.href;
    
    if (navigator.share) {
      navigator.share({
        title: `Adopt ${pet.name}`,
        text: text,
        url: url,
      }).then(() => {
        toast.success('Shared successfully!');
      }).catch(() => {
        copyToClipboard(url);
      });
    } else {
      copyToClipboard(url);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Link copied to clipboard!');
  };

  const showPetDetails = (pet: Pet) => {
    setDetailPet(pet);
    setShowPetDetailModal(true);
  };

  // Get unique breeds for filter
  const breeds = useMemo(() => {
    const uniqueBreeds = new Set(pets.map(pet => pet.breed));
    return Array.from(uniqueBreeds).sort();
  }, []);

  // Filter pets based on all criteria
  const filteredPets = useMemo(() => {
    return pets.filter(pet => {
      const matchesSpecies = speciesFilter === 'all' || pet.species === speciesFilter;
      const matchesBreed = breedFilter === 'all' || pet.breed === breedFilter;
      const matchesSearch = searchQuery === '' || 
        pet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pet.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pet.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      let matchesAge = true;
      if (ageFilter === 'young') {
        matchesAge = pet.ageInYears <= 2;
      } else if (ageFilter === 'adult') {
        matchesAge = pet.ageInYears >= 3 && pet.ageInYears <= 5;
      } else if (ageFilter === 'senior') {
        matchesAge = pet.ageInYears > 5;
      }
      
      return matchesSpecies && matchesAge && matchesSearch && matchesBreed;
    });
  }, [speciesFilter, ageFilter, searchQuery, breedFilter]);

  const favoritePets = useMemo(() => {
    return pets.filter(pet => favorites.includes(pet.id));
  }, [favorites]);

  const comparePets = useMemo(() => {
    return pets.filter(pet => compareList.includes(pet.id));
  }, [compareList]);

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        {/* Navigation Bar */}
        <motion.nav 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50 transition-colors"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <motion.div 
                className="flex items-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="text-2xl text-indigo-600 dark:text-indigo-400" style={{ fontWeight: 700 }}>
                  🐾 PawDopt
                </span>
              </motion.div>
              <div className="flex items-center space-x-8">
                <button
                  onClick={() => scrollToSection('home')}
                  className={`px-3 py-2 transition-colors ${
                    activeSection === 'home' ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400'
                  }`}
                >
                  Home
                </button>
                <button
                  onClick={() => scrollToSection('about')}
                  className={`px-3 py-2 transition-colors ${
                    activeSection === 'about' ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400'
                  }`}
                >
                  About
                </button>
                <button
                  onClick={() => scrollToSection('testimonials')}
                  className={`px-3 py-2 transition-colors ${
                    activeSection === 'testimonials' ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400'
                  }`}
                >
                  Stories
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className={`px-3 py-2 transition-colors ${
                    activeSection === 'contact' ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400'
                  }`}
                >
                  Contact
                </button>
                
                {/* Dark Mode Toggle */}
                <div className="flex items-center gap-2">
                  <Sun className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                  <Moon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </div>

                {/* Comparison Badge */}
                {compareList.length > 0 && (
                  <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setShowCompareModal(true)}
                    className="relative"
                  >
                    <GitCompare className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 bg-indigo-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                      style={{ fontSize: '0.75rem', fontWeight: 600 }}
                    >
                      {compareList.length}
                    </motion.div>
                  </motion.button>
                )}

                {/* Favorites */}
                <motion.div 
                  className="relative"
                  whileHover={{ scale: 1.05 }}
                >
                  <Heart className={`w-6 h-6 cursor-pointer transition-colors ${favorites.length > 0 ? 'text-red-500 fill-red-500' : 'text-gray-600 dark:text-gray-400'}`} />
                  {favorites.length > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                      style={{ fontSize: '0.75rem', fontWeight: 600 }}
                    >
                      {favorites.length}
                    </motion.div>
                  )}
                </motion.div>
              </div>
            </div>
          </div>
        </motion.nav>

        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative text-white overflow-hidden"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1616620649761-48f5ca3e17f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGRvZyUyMGNhdCUyMHBldHN8ZW58MXx8fHwxNzU5OTE0NzkzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/80 to-purple-900/80"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
            <motion.h1 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="mb-6" 
              style={{ fontSize: '3.5rem', fontWeight: 700 }}
            >
              Find Your Perfect Companion
            </motion.h1>
            <motion.p 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mb-8 max-w-2xl mx-auto" 
              style={{ fontSize: '1.25rem' }}
            >
              Give a loving home to a pet in need. Browse our adoptable pets and start your journey to unconditional love today.
            </motion.p>
            <motion.button
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const petsSection = document.getElementById('pets-section');
                petsSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-white text-indigo-600 px-8 py-3 rounded-full hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
              style={{ fontWeight: 600, fontSize: '1.125rem' }}
            >
              See Adoptable Pets
            </motion.button>
          </div>
        </motion.div>

        {/* Video Section */}
        <div id="about-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-center mb-8 text-gray-800 dark:text-gray-100" style={{ fontSize: '2.5rem', fontWeight: 700 }}>
              Learn About Pet Adoption
            </h2>
            <Card className="overflow-hidden max-w-4xl mx-auto dark:bg-gray-800">
              <div className="relative bg-black group">
                <video
                  ref={videoRef}
                  className="w-full"
                  loop
                  muted={isMuted}
                  playsInline
                  onEnded={() => setIsPlaying(false)}
                >
                  <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
                </video>
                
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={togglePlay}
                    className="bg-white bg-opacity-90 rounded-full p-6 shadow-lg hover:bg-opacity-100 transition-all"
                  >
                    {isPlaying ? (
                      <Pause className="w-12 h-12 text-indigo-600" />
                    ) : (
                      <Play className="w-12 h-12 text-indigo-600 ml-1" />
                    )}
                  </motion.button>
                </motion.div>

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                  <div className="flex items-center justify-between">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={togglePlay}
                      className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-all"
                    >
                      {isPlaying ? (
                        <Pause className="w-6 h-6 text-white" />
                      ) : (
                        <Play className="w-6 h-6 text-white" />
                      )}
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={toggleMute}
                      className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-all"
                    >
                      {isMuted ? (
                        <VolumeX className="w-6 h-6 text-white" />
                      ) : (
                        <Volume2 className="w-6 h-6 text-white" />
                      )}
                    </motion.button>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-white dark:bg-gray-800">
                <h3 className="mb-2 text-gray-800 dark:text-gray-100" style={{ fontSize: '1.25rem', fontWeight: 600 }}>
                  Why Adopt a Pet?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Adopting a pet saves lives and brings immeasurable joy to your home. Watch this short video to learn more about the adoption process and how you can make a difference in an animal's life.
                </p>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Testimonials Section */}
        <div id="testimonials-section" className="bg-white dark:bg-gray-800 py-16 transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12 text-gray-800 dark:text-gray-100"
              style={{ fontSize: '2.5rem', fontWeight: 700 }}
            >
              Success Stories
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <Card className="p-6 h-full dark:bg-gray-700">
                    <div className="flex items-center mb-4">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full mr-4"
                      />
                      <div>
                        <h4 className="text-gray-800 dark:text-gray-100" style={{ fontWeight: 600 }}>{testimonial.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Adopted {testimonial.pet}</p>
                      </div>
                    </div>
                    <div className="flex mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="text-yellow-400">★</span>
                      ))}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 italic">"{testimonial.text}"</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Favorites Section */}
        {favorites.length > 0 && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-red-50 dark:bg-gray-900 transition-colors">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-center gap-3 mb-8">
                <Heart className="w-8 h-8 text-red-500 fill-red-500" />
                <h2 className="text-center text-gray-800 dark:text-gray-100" style={{ fontSize: '2.5rem', fontWeight: 700 }}>
                  Your Favorites
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {favoritePets.map((pet, index) => (
                  <motion.div
                    key={pet.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ y: -8 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <ImageWithFallback
                        src={pet.image}
                        alt={pet.name}
                        className="w-full h-full object-cover cursor-pointer"
                        onClick={() => showPetDetails(pet)}
                      />
                      <motion.button
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => toggleFavorite(pet.id)}
                        className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-lg"
                      >
                        <Heart className="w-6 h-6 text-red-500 fill-red-500" />
                      </motion.button>
                    </div>
                    <div className="p-6">
                      <h3 className="mb-2 text-gray-800 dark:text-gray-100" style={{ fontSize: '1.5rem', fontWeight: 600 }}>
                        {pet.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-1">
                        <span style={{ fontWeight: 500 }}>Breed:</span> {pet.breed}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        <span style={{ fontWeight: 500 }}>Age:</span> {pet.age}
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleAdoptClick(pet)}
                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
                        style={{ fontWeight: 600 }}
                      >
                        Adopt Me
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        )}

        {/* Pet Cards Section */}
        <div id="pets-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 text-gray-800 dark:text-gray-100" 
            style={{ fontSize: '2.5rem', fontWeight: 700 }}
          >
            Meet Our Adorable Pets
          </motion.h2>

          {/* Advanced Search & Filters */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search by name, breed, or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 py-6 text-lg dark:bg-gray-800 dark:text-gray-100"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span className="text-gray-700 dark:text-gray-300" style={{ fontWeight: 500 }}>Filter by:</span>
              </div>
              
              <Select value={speciesFilter} onValueChange={setSpeciesFilter}>
                <SelectTrigger className="w-[180px] dark:bg-gray-800 dark:text-gray-100">
                  <SelectValue placeholder="Species" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Species</SelectItem>
                  <SelectItem value="Dog">Dogs</SelectItem>
                  <SelectItem value="Cat">Cats</SelectItem>
                </SelectContent>
              </Select>

              <Select value={breedFilter} onValueChange={setBreedFilter}>
                <SelectTrigger className="w-[180px] dark:bg-gray-800 dark:text-gray-100">
                  <SelectValue placeholder="Breed" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Breeds</SelectItem>
                  {breeds.map(breed => (
                    <SelectItem key={breed} value={breed}>{breed}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={ageFilter} onValueChange={setAgeFilter}>
                <SelectTrigger className="w-[180px] dark:bg-gray-800 dark:text-gray-100">
                  <SelectValue placeholder="Age Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ages</SelectItem>
                  <SelectItem value="young">Young (0-2 years)</SelectItem>
                  <SelectItem value="adult">Adult (3-5 years)</SelectItem>
                  <SelectItem value="senior">Senior (6+ years)</SelectItem>
                </SelectContent>
              </Select>

              {(speciesFilter !== 'all' || ageFilter !== 'all' || searchQuery !== '' || breedFilter !== 'all') && (
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSpeciesFilter('all');
                    setAgeFilter('all');
                    setSearchQuery('');
                    setBreedFilter('all');
                  }}
                  className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 px-3 py-2"
                  style={{ fontWeight: 500 }}
                >
                  Clear Filters
                </motion.button>
              )}
            </div>
          </motion.div>

          {/* Results Count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-6"
          >
            <Badge variant="secondary" className="px-4 py-2 dark:bg-gray-700 dark:text-gray-100">
              {filteredPets.length} {filteredPets.length === 1 ? 'pet' : 'pets'} found
            </Badge>
          </motion.div>

          {/* Pet Grid */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={`${speciesFilter}-${ageFilter}-${searchQuery}-${breedFilter}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredPets.map((pet, index) => (
                <motion.div
                  key={pet.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
                >
                  <div className="relative h-64 overflow-hidden group">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full"
                    >
                      <ImageWithFallback
                        src={pet.image}
                        alt={pet.name}
                        className="w-full h-full object-cover cursor-pointer"
                        onClick={() => showPetDetails(pet)}
                      />
                    </motion.div>
                    <div className="absolute top-3 right-3 flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(pet.id);
                        }}
                        className="bg-white rounded-full p-2 shadow-lg"
                      >
                        <Heart className={`w-6 h-6 transition-colors ${isFavorite(pet.id) ? 'text-red-500 fill-red-500' : 'text-gray-400'}`} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleCompare(pet.id);
                        }}
                        className="bg-white rounded-full p-2 shadow-lg"
                      >
                        <GitCompare className={`w-6 h-6 transition-colors ${isInCompare(pet.id) ? 'text-indigo-500' : 'text-gray-400'}`} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          sharePet(pet);
                        }}
                        className="bg-white rounded-full p-2 shadow-lg"
                      >
                        <Share2 className="w-6 h-6 text-gray-400" />
                      </motion.button>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="mb-2 text-gray-800 dark:text-gray-100" style={{ fontSize: '1.5rem', fontWeight: 600 }}>
                      {pet.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-1">
                      <span style={{ fontWeight: 500 }}>Breed:</span> {pet.breed}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      <span style={{ fontWeight: 500 }}>Age:</span> {pet.age}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {pet.personality.slice(0, 2).map((trait, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs dark:bg-gray-700 dark:text-gray-100">
                          {trait}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => showPetDetails(pet)}
                        className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 py-2 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                        style={{ fontWeight: 600 }}
                      >
                        View Details
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleAdoptClick(pet)}
                        className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
                        style={{ fontWeight: 600 }}
                      >
                        Adopt
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredPets.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <p className="text-gray-600 dark:text-gray-400" style={{ fontSize: '1.25rem' }}>
                No pets found matching your filters. Try adjusting your search!
              </p>
            </motion.div>
          )}
        </div>

        {/* Contact Section */}
        <div id="contact-section" className="bg-white dark:bg-gray-800 py-16 transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12 text-gray-800 dark:text-gray-100" 
              style={{ fontSize: '2.5rem', fontWeight: 700 }}
            >
              Get In Touch
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12 max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)" }}
              >
                <Card className="p-4 text-center h-full dark:bg-gray-700">
                  <motion.div 
                    className="inline-flex items-center justify-center w-10 h-10 bg-indigo-100 dark:bg-indigo-900 rounded-full mb-3"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Phone className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  </motion.div>
                  <h3 className="mb-1 text-gray-800 dark:text-gray-100" style={{ fontWeight: 600, fontSize: '0.9rem' }}>Phone</h3>
                  <p className="text-gray-600 dark:text-gray-400" style={{ fontSize: '0.85rem' }}>(555) 123-4567</p>
                  <p className="text-gray-600 dark:text-gray-400" style={{ fontSize: '0.85rem' }}>(555) 987-6543</p>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)" }}
              >
                <Card className="p-4 text-center h-full dark:bg-gray-700">
                  <motion.div 
                    className="inline-flex items-center justify-center w-10 h-10 bg-indigo-100 dark:bg-indigo-900 rounded-full mb-3"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Mail className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  </motion.div>
                  <h3 className="mb-1 text-gray-800 dark:text-gray-100" style={{ fontWeight: 600, fontSize: '0.9rem' }}>Email</h3>
                  <p className="text-gray-600 dark:text-gray-400" style={{ fontSize: '0.85rem' }}>info@pawdopt.com</p>
                  <p className="text-gray-600 dark:text-gray-400" style={{ fontSize: '0.85rem' }}>adopt@pawdopt.com</p>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)" }}
              >
                <Card className="p-4 text-center h-full dark:bg-gray-700">
                  <motion.div 
                    className="inline-flex items-center justify-center w-10 h-10 bg-indigo-100 dark:bg-indigo-900 rounded-full mb-3"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <MapPin className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  </motion.div>
                  <h3 className="mb-1 text-gray-800 dark:text-gray-100" style={{ fontWeight: 600, fontSize: '0.9rem' }}>Address</h3>
                  <p className="text-gray-600 dark:text-gray-400" style={{ fontSize: '0.85rem' }}>Vile Parle West</p>
                  <p className="text-gray-600 dark:text-gray-400" style={{ fontSize: '0.85rem' }}>Mumbai, Maharashtra 400056</p>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)" }}
              >
                <Card className="p-4 text-center h-full dark:bg-gray-700">
                  <motion.div 
                    className="inline-flex items-center justify-center w-10 h-10 bg-indigo-100 dark:bg-indigo-900 rounded-full mb-3"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Clock className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  </motion.div>
                  <h3 className="mb-1 text-gray-800 dark:text-gray-100" style={{ fontWeight: 600, fontSize: '0.9rem' }}>Hours</h3>
                  <p className="text-gray-600 dark:text-gray-400" style={{ fontSize: '0.85rem' }}>Mon-Fri: 9AM-6PM</p>
                  <p className="text-gray-600 dark:text-gray-400" style={{ fontSize: '0.85rem' }}>Sat-Sun: 10AM-4PM</p>
                </Card>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl mx-auto"
            >
              <Card className="p-8 dark:bg-gray-700">
                <h3 className="mb-6 text-center text-gray-800 dark:text-gray-100" style={{ fontSize: '1.5rem', fontWeight: 600 }}>
                  Send us a Message
                </h3>
                <form onSubmit={handleContactFormSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="contact-name" className="dark:text-gray-200">Name</Label>
                    <Input
                      id="contact-name"
                      type="text"
                      value={contactFormData.name}
                      onChange={(e) => setContactFormData({...contactFormData, name: e.target.value})}
                      required
                      className="dark:bg-gray-800 dark:text-gray-100"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact-email" className="dark:text-gray-200">Email</Label>
                    <Input
                      id="contact-email"
                      type="email"
                      value={contactFormData.email}
                      onChange={(e) => setContactFormData({...contactFormData, email: e.target.value})}
                      required
                      className="dark:bg-gray-800 dark:text-gray-100"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact-subject" className="dark:text-gray-200">Subject</Label>
                    <Input
                      id="contact-subject"
                      type="text"
                      value={contactFormData.subject}
                      onChange={(e) => setContactFormData({...contactFormData, subject: e.target.value})}
                      required
                      className="dark:bg-gray-800 dark:text-gray-100"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact-message" className="dark:text-gray-200">Message</Label>
                    <Textarea
                      id="contact-message"
                      value={contactFormData.message}
                      onChange={(e) => setContactFormData({...contactFormData, message: e.target.value})}
                      required
                      rows={4}
                      className="dark:bg-gray-800 dark:text-gray-100"
                    />
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3">
                      Send Message
                    </Button>
                  </motion.div>
                </form>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <span className="text-2xl" style={{ fontWeight: 700 }}>🐾 PawDopt</span>
                <p className="text-gray-400 mt-2">Making pet adoption easier, one paw at a time.</p>
              </div>
              <div className="flex space-x-6">
                <motion.a 
                  href="#" 
                  whileHover={{ scale: 1.2 }} 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Facebook className="w-6 h-6" />
                </motion.a>
                <motion.a 
                  href="#" 
                  whileHover={{ scale: 1.2 }} 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Instagram className="w-6 h-6" />
                </motion.a>
                <motion.a 
                  href="#" 
                  whileHover={{ scale: 1.2 }} 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Twitter className="w-6 h-6" />
                </motion.a>
              </div>
            </div>
            <Separator className="my-6 bg-gray-700" />
            <div className="text-center text-gray-400">
              <p>&copy; 2025 PawDopt. All rights reserved.</p>
            </div>
          </div>
        </footer>

        {/* Adoption Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="dark:bg-gray-800">
            <DialogHeader>
              <DialogTitle className="dark:text-gray-100">Adopt {selectedPet?.name}</DialogTitle>
              <DialogDescription className="dark:text-gray-400">
                Fill out the form below to start the adoption process for {selectedPet?.name}.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name" className="dark:text-gray-200">Your Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  className="dark:bg-gray-700 dark:text-gray-100"
                />
              </div>
              <div>
                <Label htmlFor="email" className="dark:text-gray-200">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                  className="dark:bg-gray-700 dark:text-gray-100"
                />
              </div>
              <div>
                <Label htmlFor="phone" className="dark:text-gray-200">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  required
                  className="dark:bg-gray-700 dark:text-gray-100"
                />
              </div>
              <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700">
                Submit Adoption Request
              </Button>
            </form>
          </DialogContent>
        </Dialog>

        {/* Pet Detail Modal */}
        <Dialog open={showPetDetailModal} onOpenChange={setShowPetDetailModal}>
          <DialogContent className="max-w-3xl dark:bg-gray-800">
            {detailPet && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-3xl dark:text-gray-100">{detailPet.name}</DialogTitle>
                  <DialogDescription className="dark:text-gray-400">
                    {detailPet.breed} • {detailPet.age} • {detailPet.gender}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-6">
                  <img 
                    src={detailPet.image} 
                    alt={detailPet.name}
                    className="w-full h-80 object-cover rounded-lg"
                  />
                  
                  <Tabs defaultValue="about" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 dark:bg-gray-700">
                      <TabsTrigger value="about" className="dark:text-gray-300">About</TabsTrigger>
                      <TabsTrigger value="personality" className="dark:text-gray-300">Personality</TabsTrigger>
                      <TabsTrigger value="health" className="dark:text-gray-300">Health</TabsTrigger>
                    </TabsList>
                    <TabsContent value="about" className="space-y-4">
                      <p className="text-gray-700 dark:text-gray-300">{detailPet.description}</p>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Breed</p>
                          <p className="dark:text-gray-200" style={{ fontWeight: 600 }}>{detailPet.breed}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Color</p>
                          <p className="dark:text-gray-200" style={{ fontWeight: 600 }}>{detailPet.color}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Weight</p>
                          <p className="dark:text-gray-200" style={{ fontWeight: 600 }}>{detailPet.weight}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Gender</p>
                          <p className="dark:text-gray-200" style={{ fontWeight: 600 }}>{detailPet.gender}</p>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="personality" className="space-y-4">
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        {detailPet.name} has a wonderful personality! Here are some key traits:
                      </p>
                      <div className="flex flex-wrap gap-3">
                        {detailPet.personality.map((trait, idx) => (
                          <Badge key={idx} variant="secondary" className="text-base px-4 py-2 dark:bg-gray-700 dark:text-gray-100">
                            {trait}
                          </Badge>
                        ))}
                      </div>
                    </TabsContent>
                    <TabsContent value="health" className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <span className="dark:text-gray-200">Vaccinated</span>
                          {detailPet.vaccinated ? (
                            <CheckCircle className="w-6 h-6 text-green-500" />
                          ) : (
                            <X className="w-6 h-6 text-red-500" />
                          )}
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <span className="dark:text-gray-200">Spayed/Neutered</span>
                          {detailPet.neutered ? (
                            <CheckCircle className="w-6 h-6 text-green-500" />
                          ) : (
                            <X className="w-6 h-6 text-red-500" />
                          )}
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>

                  <div className="flex gap-3">
                    <Button 
                      onClick={() => {
                        toggleFavorite(detailPet.id);
                      }}
                      variant="outline"
                      className="flex-1 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                    >
                      <Heart className={`w-4 h-4 mr-2 ${isFavorite(detailPet.id) ? 'fill-red-500 text-red-500' : ''}`} />
                      {isFavorite(detailPet.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                    </Button>
                    <Button 
                      onClick={() => {
                        setShowPetDetailModal(false);
                        handleAdoptClick(detailPet);
                      }}
                      className="flex-1 bg-indigo-600 hover:bg-indigo-700"
                    >
                      Adopt {detailPet.name}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Comparison Modal */}
        <Dialog open={showCompareModal} onOpenChange={setShowCompareModal}>
          <DialogContent className="max-w-6xl dark:bg-gray-800">
            <DialogHeader>
              <DialogTitle className="dark:text-gray-100">Compare Pets</DialogTitle>
              <DialogDescription className="dark:text-gray-400">
                Side by side comparison of selected pets
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {comparePets.map((pet) => (
                <Card key={pet.id} className="dark:bg-gray-700">
                  <div className="relative">
                    <img 
                      src={pet.image} 
                      alt={pet.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <Button
                      size="sm"
                      variant="destructive"
                      className="absolute top-2 right-2"
                      onClick={() => toggleCompare(pet.id)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="p-4 space-y-3">
                    <h3 className="text-xl dark:text-gray-100" style={{ fontWeight: 600 }}>{pet.name}</h3>
                    <Separator className="dark:bg-gray-600" />
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">Breed:</span>
                        <span className="dark:text-gray-200" style={{ fontWeight: 500 }}>{pet.breed}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">Age:</span>
                        <span className="dark:text-gray-200" style={{ fontWeight: 500 }}>{pet.age}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">Gender:</span>
                        <span className="dark:text-gray-200" style={{ fontWeight: 500 }}>{pet.gender}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">Weight:</span>
                        <span className="dark:text-gray-200" style={{ fontWeight: 500 }}>{pet.weight}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">Color:</span>
                        <span className="dark:text-gray-200" style={{ fontWeight: 500 }}>{pet.color}</span>
                      </div>
                    </div>
                    <Separator className="dark:bg-gray-600" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Personality:</p>
                      <div className="flex flex-wrap gap-1">
                        {pet.personality.map((trait, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs dark:bg-gray-600 dark:text-gray-100">
                            {trait}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button 
                      className="w-full bg-indigo-600 hover:bg-indigo-700"
                      onClick={() => {
                        setShowCompareModal(false);
                        handleAdoptClick(pet);
                      }}
                    >
                      Adopt {pet.name}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
            {comparePets.length === 0 && (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                No pets selected for comparison. Add pets using the compare icon on pet cards.
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

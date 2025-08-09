"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, ExternalLink, Edit, Trash2, FolderPlus } from "lucide-react";

interface Link {
  id: string;
  title: string;
  url: string;
  description?: string;
  category: string;
}

interface Category {
  id: string;
  name: string;
  description?: string;
  color: string;
}

const defaultCategories: Category[] = [
  {
    id: "1",
    name: "UI Helper",
    description: "Tools and resources for UI development",
    color: "bg-blue-100 text-blue-800",
  },
  {
    id: "2",
    name: "AI Tools",
    description: "Artificial Intelligence and ML resources",
    color: "bg-purple-100 text-purple-800",
  },
  {
    id: "3",
    name: "Development",
    description: "General development tools and resources",
    color: "bg-green-100 text-green-800",
  },
  {
    id: "4",
    name: "Design",
    description: "Design tools and inspiration",
    color: "bg-pink-100 text-pink-800",
  },
];

const defaultLinks: Link[] = [
  {
    id: "1",
    title: "Tailwind CSS",
    url: "https://tailwindcss.com",
    description: "A utility-first CSS framework",
    category: "1",
  },
  {
    id: "2",
    title: "ChatGPT",
    url: "https://chat.openai.com",
    description: "AI-powered conversational assistant",
    category: "2",
  },
  {
    id: "3",
    title: "GitHub",
    url: "https://github.com",
    description: "Code hosting and collaboration platform",
    category: "3",
  },
];

export default function RDLinksPage() {
  const [categories, setCategories] = useState<Category[]>(defaultCategories);
  const [links, setLinks] = useState<Link[]>(defaultLinks);
  const [isAddLinkOpen, setIsAddLinkOpen] = useState(false);
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<Link | null>(null);

  // Form states
  const [newLink, setNewLink] = useState({
    title: "",
    url: "",
    description: "",
    category: "",
  });

  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    color: "bg-gray-100 text-gray-800",
  });

  const colorOptions = [
    "bg-blue-100 text-blue-800",
    "bg-purple-100 text-purple-800",
    "bg-green-100 text-green-800",
    "bg-pink-100 text-pink-800",
    "bg-yellow-100 text-yellow-800",
    "bg-red-100 text-red-800",
    "bg-indigo-100 text-indigo-800",
    "bg-gray-100 text-gray-800",
  ];

  const handleAddLink = () => {
    if (newLink.title && newLink.url && newLink.category) {
      const link: Link = {
        id: Date.now().toString(),
        title: newLink.title,
        url: newLink.url,
        description: newLink.description,
        category: newLink.category,
      };
      setLinks([...links, link]);
      setNewLink({ title: "", url: "", description: "", category: "" });
      setIsAddLinkOpen(false);
    }
  };

  const handleEditLink = () => {
    if (editingLink && editingLink.title && editingLink.url) {
      setLinks(
        links.map((link) => (link.id === editingLink.id ? editingLink : link))
      );
      setEditingLink(null);
    }
  };

  const handleDeleteLink = (linkId: string) => {
    setLinks(links.filter((link) => link.id !== linkId));
  };

  const handleAddCategory = () => {
    if (newCategory.name) {
      const category: Category = {
        id: Date.now().toString(),
        name: newCategory.name,
        description: newCategory.description,
        color: newCategory.color,
      };
      setCategories([...categories, category]);
      setNewCategory({
        name: "",
        description: "",
        color: "bg-gray-100 text-gray-800",
      });
      setIsAddCategoryOpen(false);
    }
  };

  const getLinksByCategory = (categoryId: string) => {
    return links.filter((link) => link.category === categoryId);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            R&D Links Manager
          </h1>
          <p className="text-gray-600">
            Organize your research and development resources by category
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-8">
          <Dialog open={isAddLinkOpen} onOpenChange={setIsAddLinkOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Link
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Link</DialogTitle>
                <DialogDescription>
                  Add a new resource link to your R&D collection
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={newLink.title}
                    onChange={(e) =>
                      setNewLink({ ...newLink, title: e.target.value })
                    }
                    placeholder="Enter link title"
                  />
                </div>
                <div>
                  <Label htmlFor="url">URL</Label>
                  <Input
                    id="url"
                    type="url"
                    value={newLink.url}
                    onChange={(e) =>
                      setNewLink({ ...newLink, url: e.target.value })
                    }
                    placeholder="https://example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    value={newLink.description}
                    onChange={(e) =>
                      setNewLink({ ...newLink, description: e.target.value })
                    }
                    placeholder="Brief description of the resource"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={newLink.category}
                    onValueChange={(value) =>
                      setNewLink({ ...newLink, category: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleAddLink} className="w-full">
                  Add Link
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isAddCategoryOpen} onOpenChange={setIsAddCategoryOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <FolderPlus className="w-4 h-4 mr-2" />
                Add Category
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Category</DialogTitle>
                <DialogDescription>
                  Create a new category to organize your links
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="categoryName">Category Name</Label>
                  <Input
                    id="categoryName"
                    value={newCategory.name}
                    onChange={(e) =>
                      setNewCategory({ ...newCategory, name: e.target.value })
                    }
                    placeholder="Enter category name"
                  />
                </div>
                <div>
                  <Label htmlFor="categoryDescription">
                    Description (Optional)
                  </Label>
                  <Textarea
                    id="categoryDescription"
                    value={newCategory.description}
                    onChange={(e) =>
                      setNewCategory({
                        ...newCategory,
                        description: e.target.value,
                      })
                    }
                    placeholder="Brief description of the category"
                  />
                </div>
                <div>
                  <Label>Color Theme</Label>
                  <div className="grid grid-cols-4 gap-2 mt-2">
                    {colorOptions.map((color) => (
                      <button
                        key={color}
                        className={`p-3 rounded-md border-2 ${color} ${
                          newCategory.color === color
                            ? "border-gray-900"
                            : "border-transparent"
                        }`}
                        onClick={() =>
                          setNewCategory({ ...newCategory, color })
                        }
                      >
                        <div className="w-full h-2 rounded"></div>
                      </button>
                    ))}
                  </div>
                </div>
                <Button onClick={handleAddCategory} className="w-full">
                  Add Category
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const categoryLinks = getLinksByCategory(category.id);
            return (
              <Card key={category.id} className="h-fit">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge className={category.color}>{category.name}</Badge>
                    <span className="text-sm text-gray-500">
                      {categoryLinks.length}{" "}
                      {categoryLinks.length === 1 ? "link" : "links"}
                    </span>
                  </div>
                  {category.description && (
                    <CardDescription>{category.description}</CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {categoryLinks.length === 0 ? (
                      <p className="text-gray-500 text-sm italic">
                        No links added yet
                      </p>
                    ) : (
                      categoryLinks.map((link) => (
                        <div
                          key={link.id}
                          className="border rounded-lg p-3 hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-gray-900 truncate">
                                {link.title}
                              </h4>
                              {link.description && (
                                <p className="text-sm text-gray-600 mt-1">
                                  {link.description}
                                </p>
                              )}
                              <a
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-blue-600 hover:text-blue-800 inline-flex items-center mt-1"
                              >
                                Visit <ExternalLink className="w-3 h-3 ml-1" />
                              </a>
                            </div>
                            <div className="flex gap-1 ml-2">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => setEditingLink(link)}
                              >
                                <Edit className="w-3 h-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleDeleteLink(link.id)}
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Edit Link Dialog */}
        <Dialog open={!!editingLink} onOpenChange={() => setEditingLink(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Link</DialogTitle>
              <DialogDescription>Update the link information</DialogDescription>
            </DialogHeader>
            {editingLink && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="editTitle">Title</Label>
                  <Input
                    id="editTitle"
                    value={editingLink.title}
                    onChange={(e) =>
                      setEditingLink({ ...editingLink, title: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="editUrl">URL</Label>
                  <Input
                    id="editUrl"
                    type="url"
                    value={editingLink.url}
                    onChange={(e) =>
                      setEditingLink({ ...editingLink, url: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="editDescription">Description</Label>
                  <Textarea
                    id="editDescription"
                    value={editingLink.description || ""}
                    onChange={(e) =>
                      setEditingLink({
                        ...editingLink,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="editCategory">Category</Label>
                  <Select
                    value={editingLink.category}
                    onValueChange={(value) =>
                      setEditingLink({ ...editingLink, category: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleEditLink} className="w-full">
                  Update Link
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
